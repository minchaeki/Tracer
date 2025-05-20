// scripts/storeData.js
const { ethers } = require("hardhat");
const QRCode = require("qrcode");  // QR 코드 라이브러리
const fs = require("fs");          // 파일 저장 모듈
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  // 이미 Hardhat 등에서 배포된 컨트랙트 주소 (예: 로컬 Hardhat)
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contract = await ethers.getContractAt("Traceability", contractAddress);

  console.log("Using contract at address:", contractAddress);
  console.log("Storing data with account:", deployer.address);

  // 매핑 객체: 부속품 및 완성품 정보를 저장 (추후 추적용)
  const mappingData = {
    components: {},      // key: trackingId, value: { name, origin, details, processSteps, usage: [] }
    finishedProducts: {} // key: productId, value: { name, componentsUsage: [ { trackingId, usage, productionTime, details } ] }
  };

  // 이벤트에서 인자 추출 함수
  function getEventArgs(receipt, eventName) {
    let events = receipt.events || receipt.logs.map(log => {
      try {
        return contract.interface.parseLog(log);
      } catch (e) {
        return null;
      }
    }).filter(e => e !== null);
    return events.find(event => (event.event || event.name) === eventName)?.args || null;
  }

  // --------------------------
  // 1. 부속품 데이터 (전자부품)
  // --------------------------
  const components = [
    {
      name: "배터리",
      origin: "한국",
      details: "고성능 리튬이온 배터리. 안정적인 전력 공급을 위한 핵심 부품.",
     processSteps: [
  { description: "[생산] 리튬/니켈 원재료 확보 및 습도 30% 이하 조건 보관" },
  { description: "[생산] 알루미늄 전극판 코팅 및 고온 건조 (120℃, 8시간)" },
  { description: "[생산] 셀 적층 조립 및 고압 성형 (500kg/cm²)" },
  { description: "[검수] 충방전 500회 사이클 테스트 (잔존 용량 90% 이상 유지)" },
  { description: "[검수] 과충전(4.35V) 및 단락 안전성 시험 (UL1642 기준)" },
  { description: "[포장] PVC 열수축 포장 및 라벨 자동 인쇄 부착" },
  { description: "[유통] 냉장 창고(15℃) 24시간 보관 후 인천 조립 라인 배송" }
]
    },
    {
      name: "디스플레이",
      origin: "일본",
      details: "고해상도 OLED 디스플레이. 선명한 화질과 낮은 전력 소모가 특징.",
      processSteps: [
  { description: "[생산] 기판 위 OLED 증착 (유기 재료 3층 구조, FMM 방식)" },
  { description: "[생산] LTPS TFT 배선 처리 및 양산용 레이저 어닐링" },
  { description: "[생산] 컬러 필터 정렬 및 압착 라미네이션 (120kg/㎠)" },
  { description: "[검수] 휘도 800nit 이상, 명암비 10,000:1 기준 측정" },
  { description: "[검수] 10점 터치 오차율 ±1.0% 이하 테스트" },
  { description: "[포장] 정전기 방지 포장지 + 다층 완충제 사용" },
  { description: "[유통] 항온창고(20±2℃) 12시간 보관 후 운송장 발급 및 출고" }
]
    },
    {
      name: "프로세서",
      origin: "미국",
      details: "최신 AI 지원 프로세서. 고성능 연산 및 에너지 효율이 뛰어남.",
     processSteps: [
  { description: "[설계] 5nm 공정 기반 ARM Cortex-A78 설계 최적화" },
  { description: "[생산] EUV 리소그래피 기반 웨이퍼 패터닝 수행" },
  { description: "[생산] 다이 컷팅 및 BGA(288핀) 패키지 조립" },
  { description: "[검수] 연산능력 테스트 (Geekbench 멀티코어 3800점 이상)" },
  { description: "[검수] Junction 온도 100℃ 기준 24시간 버닝테스트" },
  { description: "[포장] Drypack + MSL3 등급 레벨 습기 방지 포장" },
  { description: "[유통] DHL 항공물류 배송 후 최종 조립 공정 입고 등록" }
]

    },
    {
      name: "카메라 모듈",
      origin: "독일",
      details: "고화질 이미지 센서 탑재. 뛰어난 색감과 선명도를 자랑함.",
      processSteps: [
  { description: "[생산] 8P 렌즈 정렬 및 1/1.7\" 이미지 센서 부착" },
  { description: "[생산] IR 필터 삽입 및 레이저 정렬 보정" },
  { description: "[생산] FPC 접착 및 저온 리플로우 납땜 (260℃, 30초)" },
  { description: "[검수] SNR(신호대잡음비) 45dB 이상, 해상도 12MP 테스트" },
  { description: "[검수] 색상 정확도 DeltaE 2.0 이하 측정" },
  { description: "[포장] 방진 비닐 + 품질 인증 스티커 부착" },
  { description: "[유통] EMS(전자조립업체)로 납품 및 ERP 시스템 등록" }
]

    }
  ];

  // 부속품 등록 및 tracking id 저장
  const componentTrackingIds = {}; // key: component name, value: trackingId
  for (let comp of components) {
    // 1) 부속품 생성 (스마트컨트랙트 호출)
    let stepDescriptions = comp.processSteps.map(step => step.description);
    let tx = await contract.createComponent(comp.name, comp.origin, comp.details, stepDescriptions);
    let receipt = await tx.wait();
    let args = getEventArgs(receipt, "ComponentCreated");
    let rawTrackingId = args ? args.trackingId.toString() : undefined;
    if (!rawTrackingId) {
      console.error(`❌ ${comp.name} 생성 실패 (trackingId 미확인)`);
      continue;
    }
    // tracking id 해싱 제거: 원래 값을 그대로 사용
    componentTrackingIds[comp.name] = rawTrackingId;
    // 부속품 세부 정보와 빈 사용 내역 배열 저장
    mappingData.components[rawTrackingId] = {
      name: comp.name,
      origin: comp.origin,
      details: comp.details,
      processSteps: comp.processSteps,
      usage: []  // 나중에 이 부속품이 사용된 완성품 정보 추가
    };
    console.log(`✅ ${comp.name} 등록 완료. Tracking ID: ${rawTrackingId}`);
    
    // 2) 각 부속품에 대해 생산(공정) 단계 추가
    for (let step of comp.processSteps) {
      let stepTx = await contract.addProcessStep(rawTrackingId, step.description);
      await stepTx.wait();
      console.log(`   ✅ 공정 단계 추가: ${step.description}`);
    }
  }

  // ---------------------------------
  // 2. 완성품 데이터 (전자제품)
  // ---------------------------------
  // 이번 예시에서는 한 부속품(예: 배터리)이 여러 완성품에 사용되는 상황을 반영합니다.
  // 완성품은 “스마트폰 A”, “스마트폰 B”, “태블릿”으로 구성합니다.
  // 각 완성품은 부속품별 사용량, 생산시간, 세부 설명을 기록합니다.
  const finishedProducts = [
    {
      name: "스마트폰 A",
      componentsUsage: [
        { componentName: "배터리", usage: "3000mAh", productionTime: "25분55초", details: "배터리 셀 조립 및 용량 테스트 완료" },
        { componentName: "디스플레이", usage: "6.1인치 OLED", productionTime: "26분10초", details: "화면 조립 및 색상 보정 완료" },
        { componentName: "프로세서", usage: "1개", productionTime: "26분20초", details: "칩 성능 및 온도 테스트 완료" },
        { componentName: "카메라 모듈", usage: "2개", productionTime: "26분30초", details: "듀얼 카메라 정밀 조립 완료" }
      ]
    },
    {
      name: "스마트폰 B",
      componentsUsage: [
        { componentName: "배터리", usage: "3500mAh", productionTime: "27분00초", details: "고용량 배터리 셀 조립 완료" },
        { componentName: "디스플레이", usage: "6.5인치 OLED", productionTime: "27분10초", details: "대형 패널 조립 및 검수 완료" },
        { componentName: "프로세서", usage: "1개", productionTime: "27분20초", details: "최신 프로세서 성능 최적화 완료" },
        { componentName: "카메라 모듈", usage: "3개", productionTime: "27분30초", details: "트리플 카메라 모듈 정밀 조립 완료" }
      ]
    },
    {
      name: "태블릿",
      componentsUsage: [
        { componentName: "배터리", usage: "5000mAh", productionTime: "28분00초", details: "태블릿 전용 대용량 배터리 조립 완료" },
        { componentName: "디스플레이", usage: "10.1인치 OLED", productionTime: "28분10초", details: "대형 디스플레이 조립 및 색상 보정 완료" },
        { componentName: "프로세서", usage: "1개", productionTime: "28분20초", details: "태블릿 전용 프로세서 성능 테스트 완료" },
        { componentName: "카메라 모듈", usage: "1개", productionTime: "28분30초", details: "싱글 카메라 모듈 정밀 조립 완료" }
      ]
    }
  ];

  // 각 완성품 등록 및 부속품 사용 내역 업데이트
  for (let finished of finishedProducts) {
    // 완성품에 사용된 부속품 tracking id 배열 구성 (부속품 이름 기준)
    let usedComponentIds = finished.componentsUsage.map(usage => {
      const compId = componentTrackingIds[usage.componentName];
      if (!compId) {
        console.error(`❌ 부속품 ${usage.componentName} 의 tracking id를 찾을 수 없습니다.`);
      }
      return compId;
    });

    // 스마트컨트랙트 호출: 완성품 등록
    let productTx = await contract.createProduct(finished.name, usedComponentIds);
    let productReceipt = await productTx.wait();
    let productArgs = getEventArgs(productReceipt, "ProductCreated");
    let rawProductId = productArgs ? productArgs.productId.toString() : undefined;
    if (!rawProductId) {
      console.error(`❌ ${finished.name} 생성 실패 (productId 미확인)`);
      continue;
    }
    // 완성품 정보를 mappingData.finishedProducts에 저장 (부속품 사용 내역 포함)
    mappingData.finishedProducts[rawProductId] = {
      name: finished.name,
      componentsUsage: finished.componentsUsage.map(usage => ({
        trackingId: componentTrackingIds[usage.componentName],
        componentName: usage.componentName,
        usage: usage.usage,
        productionTime: usage.productionTime,
        details: usage.details
      }))
    };
    console.log(`✅ ${finished.name} 등록 완료. Product ID: ${rawProductId}`);

    // 각 부속품의 usage에 완성품 사용 내역 업데이트
    finished.componentsUsage.forEach(usage => {
      const compId = componentTrackingIds[usage.componentName];
      if (mappingData.components[compId]) {
        mappingData.components[compId].usage.push({
          finishedProduct: finished.name,
          productId: rawProductId,
          usage: usage.usage,
          productionTime: usage.productionTime,
          details: usage.details
        });
      }
    });

    // ------------------------------------
    // QR 코드 생성 (완성품에 대해서만)
    // ------------------------------------
    const productQRContent = `Product ID: ${rawProductId}`;
    await new Promise((resolve, reject) => {
      QRCode.toDataURL(productQRContent, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) return reject(err);
        const base64Data = url.replace(/^data:image\/png;base64,/, "");
        const filePath = path.join(__dirname, `qr_product_${rawProductId}.png`);
        fs.writeFile(filePath, base64Data, 'base64', err => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  }

  // mappingData를 JSON 파일로 저장 (예: mapping.json)
  fs.writeFileSync(
    path.join(__dirname, "mapping.json"),
    JSON.stringify(mappingData, null, 2),
    "utf-8"
  );
  console.log("✅ mapping.json 파일에 부속품 및 완성품 매핑 정보 저장 완료");

  // -----------------------------
  // 트리 구조로 완성품-부속품 출력
  // -----------------------------
  console.log("\n=== 완성품-부속품 트리 구조 ===");
  for (let [productId, productInfo] of Object.entries(mappingData.finishedProducts)) {
    console.log(`📦 [${productId}] ${productInfo.name}`);
    productInfo.componentsUsage.forEach(compUsage => {
      console.log(`   ├─ ${compUsage.componentName} (Tracking ID: ${compUsage.trackingId})`);
      console.log(`   │    ├─ 사용량: ${compUsage.usage}`);
      console.log(`   │    ├─ 생산시간: ${compUsage.productionTime}`);
      console.log(`   │    └─ 세부사항: ${compUsage.details}`);
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

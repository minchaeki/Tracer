# 🛡️ Tracer: 블록체인 기반 제품 이력 추적 시스템

본 프로젝트는 제조 및 유통 과정에서 발생하는 **부품 결함·리콜 문제**를 해결하기 위해, **부속품 단위의 생산·유통·조립 이력을 블록체인에 기록**하여 **투명성, 무결성, 추적 가능성**을 보장하는 **연구 기반 추적 시스템**입니다.

---

## 📑 Table of Contents

1. [프로젝트 배경 및 문제 정의](#-프로젝트-배경-및-문제-정의)
2. [핵심 기능](#-핵심-기능)
3. [시스템 아키텍처](#-시스템-아키텍처)
4. [기술 스택](#-기술-스택)
5. [프로젝트 구조](#-프로젝트-구조)
6. [데이터 구조 및 시각화](#-데이터-구조-및-시각화)
7. [Smart Contract 설계](#-smart-contract-설계)
8. [시스템 시연](#-시스템-시연)
9. [시작하기 (Getting Started)](#-시작하기-getting-started)
10. [사용 방법](#-사용-방법)
11. [기대 효과](#-기대-효과)
12. [배운 점 및 회고](#-배운-점-및-회고)
13. [코드 컨벤션](#-코드-컨벤션)
14. [문제 해결 (Troubleshooting)](#️-문제-해결-troubleshooting)
15. [논문 정보](#-논문-정보)


---

## 💡 프로젝트 배경 및 문제 정의

### 왜 이 프로젝트를 만들었는가?

전자기기·의료기기 산업에서 **단일 부품 결함이 대규모 리콜로 확산되는 사례**가 반복되고 있습니다. 그러나 기존 시스템에는 다음과 같은 구조적 한계가 존재합니다.

| 기존 문제 | Tracer의 해결 방식 |
|:---|:---|
| 중앙 서버 의존 → 단일 장애점 | Ethereum **분산 원장**으로 단일 장애점 제거 |
| 이력 데이터 위·변조 가능 | 블록체인의 **불변성**으로 위·변조 원천 차단 |
| 완제품 단위 추적만 가능 | **부속품(Component) 단위** 이력 추적 체계 구축 |
| 수동 검증 → 느린 리콜 대응 | 스마트 컨트랙트 기반 **자동화된 검증 및 기록** |

---

## ⚙ 핵심 기능

| 기능 | 설명 |
|:---|:---|
| 🧾 **부속품/제품 등록** | 생산 정보 및 초기 소유권을 스마트 컨트랙트를 통해 온체인 등록 |
| 🔄 **소유권 이전 관리** | 유통 단계별 소유권 변경 이력을 블록체인에 투명하게 기록 |
| 🔍 **이력 추적 & 타임라인** | 시리얼 번호로 검색하여 생산부터 현재까지 전체 이력을 타임라인으로 조회 |
| 🌳 **트리 구조 시각화** | 완제품-부속품 간 계층 관계를 트리 형태로 직관적 시각화 |
| 📱 **QR 코드 연동** | QR 스캔만으로 온체인 이력 데이터에 즉시 접근 |
| 🔐 **역할 기반 접근 제어** | MetaMask 인증 기반 관리자/일반 사용자 권한 분리 |

---

## 🏗 시스템 아키텍처

본 시스템은 **3-Tier 아키텍처**로 구성됩니다.

```
┌─────────────────────────────────────────────────────────────────┐
│                     🖥️  Frontend (Client)                       │
│  HTML / CSS / JavaScript / Ethers.js                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ 제품 등록 │ │ 이력 검색 │ │ 타임라인 │ │ 트리 구조 시각화 │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│                        ▲ MetaMask 연동                          │
└────────────────────────┼────────────────────────────────────────┘
                         │ Ethers.js (JSON-RPC)
┌────────────────────────┼────────────────────────────────────────┐
│                     🔗  Blockchain Layer                        │
│  Ethereum (Sepolia Testnet / Hardhat Local)                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  📜 Traceability.sol (Smart Contract)                   │    │
│  │  • createComponent()  — 부속품 등록                      │    │
│  │  • createProduct()    — 완제품 등록 & 부속품 연결        │    │
│  │  • addProcessStep()   — 공정 단계 추가                   │    │
│  │  • getComponent() / getProduct() — 이력 조회             │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────────┐
│                     🗄️  Server / Scripts                        │
│  Node.js 기반 유틸리티                                          │
│  • 관리자 지갑 생성 (generateWallets.js)                        │
│  • QR 코드 & 데이터 저장 (storeData.js)                         │
│  • 스마트 컨트랙트 배포 (Hardhat Ignition)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 기술 스택

| Category | Stack |
|:---:|:---|
| **Blockchain** | ![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?style=flat-square&logo=ethereum&logoColor=white) ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white) ![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=flat-square&logo=hardhat&logoColor=black) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Ethers.js](https://img.shields.io/badge/Ethers.js-2535A0?style=flat-square) |
| **Wallet** | ![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=flat-square&logo=metamask&logoColor=white) |
| **Infra / Tools** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) |

---

## 📂 프로젝트 구조

```
Tracer/
├── contracts/                  # Solidity 스마트 컨트랙트
│   └── Traceability.sol        #   → 핵심 추적 로직 (부속품/제품/공정 관리)
├── frontend/                   # 프론트엔드 (정적 웹 앱)
│   ├── admin/                  #   → 관리자 페이지
│   ├── data/                   #   → adminWallets.json 등 설정 데이터
│   ├── productRegister.html    #   → 제품 등록 페이지
│   ├── search.html             #   → 이력 검색 페이지
│   └── timeline.html           #   → 타임라인 시각화 페이지
├── server/                     # 서버 사이드 유틸리티
├── scripts/                    # 배포 및 유틸 스크립트
│   ├── generateWallets.js      #   → 관리자 지갑 생성
│   └── storeData.js            #   → QR코드 생성 & 데이터 저장
├── test/                       # 스마트 컨트랙트 테스트
├── ignition/modules/           # Hardhat Ignition 배포 모듈
├── hardhat.config.js           # Hardhat 설정
└── package.json                # 프로젝트 의존성
```

---

## 📊 데이터 구조 및 시각화

### 온체인 데이터 구조 (JSON 표현)

```json
{
  "componentName": "Battery",
  "usage": "3000mAh",
  "productionTime": "2025-04-22 11:04:06",
  "details": "Quality inspection and packaging completed"
}
```

### 🌳 Component Traceability Tree

완제품을 **Root Node**로, 하위에 각 **부속품(Component)** 및 **공정 단계(Process)**를 연결한 **계층적 트리 구조**로 이력을 시각화합니다.

```
                    📦 완제품 (Product)
                   /        |         \
           🔧 Battery   🔧 Display   🔧 Chip
              |             |            |
         ⚙ 품질검사     ⚙ 조립       ⚙ 웨이퍼 가공
              |             |            |
         ⚙ 패키징      ⚙ 테스트      ⚙ 패키징
```

이를 통해 특정 부속품이 **어디에서 생산**되고, **어떤 공정**을 거쳐, **어떤 완제품에 조립**되었는지 직관적으로 추적할 수 있습니다. 결함 발생 시 **문제 부속품을 즉시 식별**할 수 있습니다.

<img width="1080" height="642" alt="component-tree-visualization" src="https://github.com/user-attachments/assets/ee011cb5-a806-4c9b-9945-91794ddef0e8" />

> 📌 위와 같은 트리 구조를 통해 특정 부속품 단위까지 이력 추적이 가능하도록 설계되었습니다.

---

## 📜 Smart Contract 설계

핵심 스마트 컨트랙트 `Traceability.sol`의 구조입니다.

### 데이터 모델

| Struct | 역할 | 주요 필드 |
|:---|:---|:---|
| `ProcessStep` | 공정 단계 | `timestamp`, `description` |
| `Component` | 부속품 정보 | `trackingId`, `name`, `origin`, `details`, `processSteps[]` |
| `Product` | 완제품 정보 | `productId`, `name`, `componentTrackingIds[]` |

### 핵심 함수

| 함수 | 기능 | 반환값 |
|:---|:---|:---|
| `createComponent()` | 새 부속품 등록 + 초기 공정 기록 | `trackingId` |
| `addProcessStep()` | 부속품에 공정 단계 추가 | — |
| `createProduct()` | 완제품 등록 + 부속품 연결 | `productId` |
| `getComponent()` | 부속품 정보 조회 | `Component` |
| `getProduct()` | 완제품 정보 조회 | `Product` |
| `getProcessSteps()` | 부속품의 전체 공정 단계 조회 | `ProcessStep[]` |
| `getProductsByComponent()` | 부속품이 사용된 완제품 목록 조회 | `productId[]` |

### 이벤트

| Event | 발생 시점 |
|:---|:---|
| `ComponentCreated` | 부속품 생성 완료 시 |
| `ProductCreated` | 완제품 생성 완료 시 |
| `ProcessStepAdded` | 공정 단계 추가 시 |

> 📌 `productsByComponent` 역방향 매핑을 통해, 특정 부속품이 어떤 완제품에 사용되었는지 **역추적(Reverse Tracing)**이 가능합니다. 이는 리콜 시 영향 범위를 빠르게 파악하는 데 핵심적인 역할을 합니다.

---


## 🎬 시스템 시연

본 프로젝트는 **실제 동작하는 웹 기반 시스템**으로 구현되었습니다.

### 1️⃣ MetaMask 기반 로그인
- 블록체인 지갑 인증
- 관리자 / 일반 사용자 권한 분리

<img width="380" height="463" alt="login" src="https://github.com/user-attachments/assets/3537e2e0-882b-44e3-91a5-992ee22e2616" />

MetaMask 기반 사용자 인증으로 관리자와 사용자 역할 분리했습니다.
  
---

### 2️⃣ 부속품 이력 등록 (관리자)

<img width="1102" height="614" alt="register" src="https://github.com/user-attachments/assets/3cdf541e-bc30-40dc-8a84-b916d62bc164" />

부속품 정보 입력 후 블록체인에 등록 합니다. 스마트 컨트랙트를 통해 **즉시 블록체인에 기록** 됩니다.

---

### 3️⃣ 사용자 이력 조회 및 시각화

#### 🔍 시리얼 번호 기반 검색
<img width="1217" height="631" alt="스크린샷 2026-02-09 오전 2 39 43" src="https://github.com/user-attachments/assets/fef6add7-b8ac-47f9-8112-da058ec3eb04" />

시리얼 넘버 입력을 통해 검색을 할 수 있습니다

#### 📊 시각화 결과
<img width="879" height="696" alt="timeline" src="https://github.com/user-attachments/assets/92af0c32-8dc4-4eb5-8f44-1b564700b05b" />

<img width="1098" height="606" alt="tree-view" src="https://github.com/user-attachments/assets/eb7ec4ce-6d0c-4114-bcd9-96ee8459ee6c" />

검색 시 정보를 다양한 시각화 자료로 볼 수 있습니다.

---

## 🚀 시작하기 (Getting Started)

### 사전 요구사항

| 도구 | 버전 | 링크 |
|:---|:---|:---|
| Node.js | LTS (v18.x 또는 v20.x 권장) | [다운로드](https://nodejs.org/en/download/) |
| npm | Node.js 설치 시 포함 | — |
| Git | 최신 버전 | [다운로드](https://git-scm.com/downloads) |
| MetaMask | 브라우저 확장 프로그램 | [설치](https://metamask.io/download/) |

### 설치 및 실행

```bash
# 1. 저장소 복제
git clone https://github.com/minchaeki/Tracer.git
cd Tracer

# 2. 의존성 설치
npm install

# 3. 스마트 컨트랙트 컴파일
npx hardhat compile

# 4. 로컬 Hardhat 네트워크 실행 (새 터미널)
npx hardhat node

# 5. 스마트 컨트랙트 배포 (원래 터미널)
npx hardhat ignition deploy ignition/modules/TraceabilityModule.js --network localhost
# → 출력된 계약 주소를 메모하세요!

# 6. (선택) 관리자 지갑 생성
node scripts/generateWallets.js

# 7. 프론트엔드 실행
npm install -g http-server
cd frontend
http-server
# → http://localhost:8080 에서 확인
```

> 💡 **Tip**: `npx hardhat node` 실행 시 출력되는 테스트 계정의 개인 키를 MetaMask에 가져오면 로컬 테스트가 가능합니다.

---

## 📖 사용 방법

| 단계 | 경로 | 설명 |
|:---:|:---|:---|
| 1 | `/admin/admin.html` | 관리자 패널에서 계약 주소 설정 |
| 2 | `/productRegister.html` | 제품/부속품 정보 입력 → 블록체인 등록 |
| 3 | `node scripts/storeData.js` | QR 코드 생성 |
| 4 | `/search.html` | 시리얼 번호로 제품 검색 |
| 5 | `/timeline.html` | 제품의 전체 이력 타임라인 조회 |

---

## 🚀 기대 효과

| 효과 | 설명 |
|:---|:---|
| 🔧 **신속한 리콜 대응** | 결함 부속품의 위치 및 사용 제품 즉시 식별 → 리콜 범위 최소화 및 비용 절감 |
| 🔐 **소비자 신뢰도 향상** | 제조·유통 이력의 투명한 공개 → 제품 신뢰성 및 브랜드 가치 강화 |
| 🧩 **End-to-End 추적** | 자재 조달부터 소비자 전달까지 전 공정 단일 추적 체계 구축 |

---

## 🔍 배운 점 및 회고

> ⚠️ **Note**: 아래 내용은 예시입니다. 본인의 실제 경험에 맞게 수정해주세요!

### 기술적 성장

- **블록체인 DApp 설계 경험**: Solidity 스마트 컨트랙트 설계부터 Ethers.js를 활용한 프론트엔드 연동까지, 탈중앙화 애플리케이션의 전체 개발 사이클을 경험했습니다.
- **온체인/오프체인 데이터 설계**: 모든 데이터를 블록체인에 저장하면 가스비가 급증하는 문제를 인식하고, 핵심 이력 데이터만 온체인에 기록하는 전략을 학습했습니다.
- **스마트 컨트랙트 테스트**: Hardhat 환경에서 단위 테스트를 작성하며, 배포 후 수정이 불가능한 컨트랙트의 품질 보증 중요성을 체감했습니다.

### 아쉬운 점 & 개선 방향

- **가스비 최적화**: 현재 구조에서 대량 등록 시 가스비 부담이 있어, Batch 처리나 Layer 2 솔루션 적용을 고려할 수 있습니다.
- **IPFS 연동**: 이미지·문서 등 대용량 데이터는 IPFS에 저장하고 해시만 온체인에 기록하는 구조로 확장 가능합니다.
- **접근 제어 고도화**: 현재 관리자/사용자 이분법 → 공급업체·제조사·유통사 등 세분화된 역할 관리로 발전시킬 수 있습니다.

---

## 📏 코드 컨벤션

### JavaScript (ES6+)

- **포맷팅**: Prettier (기본 설정)
- **네이밍**: 변수/함수 `camelCase`, 클래스 `PascalCase`, 상수 `UPPER_CASE`
- **모듈**: ES6 `import`/`export`

### Solidity

- **포맷팅**: `prettier-plugin-solidity`
- **네이밍**: 계약/구조체 `PascalCase`, 함수/변수 `camelCase`, 이벤트 `PascalCase`
- **가시성**: `public`, `private`, `internal`, `external` 명확히 지정

---

## ⚠️ 문제 해결 (Troubleshooting)

<details>
<summary><b>🔐 관리자 MetaMask 로그인이 되지 않는 경우</b></summary>

1. MetaMask 네트워크가 **"Localhost 8545"**로 설정되어 있는지 확인
2. `npx hardhat node` 실행 시 출력된 테스트 계정을 **"개인 키 가져오기"**로 MetaMask에 추가했는지 확인
3. `frontend/data/adminWallets.json`의 관리자 지갑 주소와 MetaMask 선택 계정이 일치하는지 확인

</details>

<details>
<summary><b>🔍 검색 결과가 표시되지 않는 경우</b></summary>

1. 브라우저 개발자 도구(F12) → Console 탭에서 `RPC Error`, `Contract not found` 등 오류 확인
2. 프론트엔드 JS 파일의 스마트 컨트랙트 주소가 배포 시 출력된 주소와 동일한지 확인
3. MetaMask가 올바른 네트워크에 연결되어 있고, 해당 네트워크에서 계약이 배포되었는지 확인

</details>

---


## 📄 논문 정보 

본 프로젝트는 **단순 구현 사례가 아니라**,직접 설계·구현한 시스템을 기반으로 **학술 논문으로 확장**한 연구 결과입니다.

### 🏛 학회 정보
- **학회명:** 한국정보기술학회 (KIIT)
- **발표처:** 한국정보기술학회 종합학술대회 논문집
- **발표 연도:** 2024

### 📝 논문 제목
> **블록체인 기반 전자 부품 단위 이력 추적 시스템 설계 및 구현**

### 📎 논문 PDF
👉 [학술대회논문.pdf](https://github.com/user-attachments/files/25172425/default.pdf)


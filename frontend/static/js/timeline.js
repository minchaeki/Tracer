(async function () {
  // localStorage에서 trackingId 가져오기
  const trackingId = localStorage.getItem("timelineTrackingId");
  if (!trackingId) {
    document.getElementById("timeline").innerHTML =
      "<p>트래킹 ID 정보가 없습니다. 메인 페이지에서 입력해주세요.</p>";
    return;
  }

  // 블록체인 연결 및 컨트랙트 준비
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545/"
  );
  const privateKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  const signer = new ethers.Wallet(privateKey, provider);
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "trackingId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "ComponentCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "trackingId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "ProcessStepAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "productId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "componentTrackingIds",
          type: "uint256[]",
        },
      ],
      name: "ProductCreated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_trackingId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "addProcessStep",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "componentCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "components",
      outputs: [
        {
          internalType: "uint256",
          name: "trackingId",
          type: "uint256",
        },
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "origin", type: "string" },
        { internalType: "string", name: "details", type: "string" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_origin", type: "string" },
        { internalType: "string", name: "_details", type: "string" },
        {
          internalType: "string[]",
          name: "_processDescriptions",
          type: "string[]",
        },
      ],
      name: "createComponent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        {
          internalType: "uint256[]",
          name: "_componentTrackingIds",
          type: "uint256[]",
        },
      ],
      name: "createProduct",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_trackingId",
          type: "uint256",
        },
      ],
      name: "getComponent",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "trackingId",
              type: "uint256",
            },
            { internalType: "string", name: "name", type: "string" },
            {
              internalType: "string",
              name: "origin",
              type: "string",
            },
            {
              internalType: "string",
              name: "details",
              type: "string",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
              ],
              internalType: "struct Traceability.ProcessStep[]",
              name: "processSteps",
              type: "tuple[]",
            },
          ],
          internalType: "struct Traceability.Component",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_trackingId",
          type: "uint256",
        },
      ],
      name: "getProcessSteps",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
          ],
          internalType: "struct Traceability.ProcessStep[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_productId",
          type: "uint256",
        },
      ],
      name: "getProduct",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "productId",
              type: "uint256",
            },
            { internalType: "string", name: "name", type: "string" },
            {
              internalType: "uint256[]",
              name: "componentTrackingIds",
              type: "uint256[]",
            },
          ],
          internalType: "struct Traceability.Product",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_trackingId",
          type: "uint256",
        },
      ],
      name: "getProductsByComponent",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "globalId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "productCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "products",
      outputs: [
        {
          internalType: "uint256",
          name: "productId",
          type: "uint256",
        },
        { internalType: "string", name: "name", type: "string" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "", type: "uint256" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "productsByComponent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // 부품별 색상 매핑
  const componentColors = {
    배터리: "#ba68c8", // #ba68c8
    디스플레이: "#64b5f6", // #64b5f6
    프로세서: "#aed581", // #aed581
  };
  const defaultColors = [
    // 해당하는 이름이 없으면 이 리스트에서 순서대로 선택됨
    "rgb(241, 115, 157)",
    "rgb(254, 225, 132)",
    "rgb(93, 207, 223)",
  ];
  let defaultColorIdx = 0;

  let itemsArray = [];
  let timelineTitle = "";

  try {
    // 제품 기준 조회
    let productData = await contract.getProduct(parseInt(trackingId));
    const componentIds = productData.componentTrackingIds || productData[2];
    timelineTitle = `<div class="gradient-text-purple">${
      productData.name || productData[1]
    } 유통 타임라인 </div>`;

    for (let compId of componentIds) {
      try {
        let compData = await contract.getComponent(compId);
        const compName = compData.name || compData[1];
        const processSteps = compData.processSteps || compData[4];
        processSteps.forEach((step, index) => {
          const dateObj = new Date(step.timestamp * 1000);
          itemsArray.push({
            compName,
            stepIndex: index + 1,
            dateStr: dateObj.toLocaleString(),
            description: step.description,
          });
        });
      } catch (err) {
        console.error(`부속품 ${compId} 조회 실패: `, err);
      }
    }
  } catch (productError) {
    // 부품 단독 조회
    try {
      let compData = await contract.getComponent(parseInt(trackingId));
      const compName = compData.name || compData[1];
      const processSteps = compData.processSteps || compData[4];
      timelineTitle = `<div class="gradient-text-purple">${compName} 공정 타임라인</div>`;

      processSteps.forEach((step, index) => {
        const dateObj = new Date(step.timestamp * 1000);
        itemsArray.push({
          compName,
          stepIndex: index + 1,
          dateStr: dateObj.toLocaleString(),
          description: step.description,
        });
      });
    } catch (err) {
      console.error("getComponent 호출 실패:", err);
      document.getElementById("timeline").innerHTML =
        "<p>입력한 트래킹 ID의 정보를 가져올 수 없습니다.</p>";
      return;
    }
  }

  if (itemsArray.length === 0) {
    document.getElementById("timeline").innerHTML =
      "<p>해당 ID에 대한 공정 단계 정보가 없습니다.</p>";
    return;
  }

  // 각 부품 이름별 색상 매핑
  const nameColorMap = {};
  itemsArray.forEach((item) => {
    if (!nameColorMap[item.compName]) {
      if (componentColors[item.compName]) {
        nameColorMap[item.compName] = componentColors[item.compName];
      } else {
        nameColorMap[item.compName] =
          defaultColors[defaultColorIdx % defaultColors.length];
        defaultColorIdx++;
      }
    }
  });

  // 타임라인 DOM 생성
  const timelineDiv = document.getElementById("timeline");
  timelineDiv.innerHTML = `<div class="timelineTitle">${timelineTitle}<div><div class="vertical-timeline"></div></div>`;
  const vTimeline = timelineDiv.querySelector(".vertical-timeline");

  itemsArray.forEach((item, idx) => {
    const color = nameColorMap[item.compName];
    vTimeline.innerHTML += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">
              STEP ${item.stepIndex}${
      item.compName
        ? ` | <span style="color:${color}; font-weight:bold;">${item.compName}</span>`
        : ""
    }
            </div>
            <div class="timeline-title">${item.description}</div>
            <div style="font-size:0.9rem; color:#bbb;">${item.dateStr}</div>
          </div>
        </div>
      `;
  });

  // 애니메이션 효과
  const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item) => observer.observe(item));
})();

// up-btn 함수 추가

$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $("#upBtn").fadeIn();
  } else {
    $("#upBtn").fadeOut();
  }
});

$("#upBtn").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 400);
  return false;
});

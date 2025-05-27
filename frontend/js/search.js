document.addEventListener("DOMContentLoaded", async function () {
  const btnSearchInfo = document.getElementById("btnSearchInfo");
  const resultSection = document.getElementById("resultSection");

  // 이더리움 provider 및 계약 연결
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // 실제 주소로 변경
  const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "trackingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "ComponentCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "trackingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "ProcessStepAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "componentTrackingIds",
          "type": "uint256[]"
        }
      ],
      "name": "ProductCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackingId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "addProcessStep",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "componentCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "components",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "trackingId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "details",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_origin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_details",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_processDescriptions",
          "type": "string[]"
        }
      ],
      "name": "createComponent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "_componentTrackingIds",
          "type": "uint256[]"
        }
      ],
      "name": "createProduct",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackingId",
          "type": "uint256"
        }
      ],
      "name": "getComponent",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "trackingId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "origin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "details",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "description",
                  "type": "string"
                }
              ],
              "internalType": "struct Traceability.ProcessStep[]",
              "name": "processSteps",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct Traceability.Component",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackingId",
          "type": "uint256"
        }
      ],
      "name": "getProcessSteps",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct Traceability.ProcessStep[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        }
      ],
      "name": "getProduct",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "productId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256[]",
              "name": "componentTrackingIds",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct Traceability.Product",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_trackingId",
          "type": "uint256"
        }
      ],
      "name": "getProductsByComponent",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "globalId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "productCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "productId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "productsByComponent",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  btnSearchInfo.addEventListener("click", async function () {
    resultSection.innerHTML = "";
    const input = document.getElementById("trackingId").value.trim();
    if (!input) {
      resultSection.innerHTML = "<p>트래킹 ID를 입력하세요.</p>";
      return;
    }

    // 먼저 제품으로 조회 시도
    try {
      let productData = await contract.getProduct(input);
      const prodId = productData.productId ? productData.productId.toString() : productData[0].toString();
      const productName = productData.name || productData[1];
      const componentIds = productData.componentTrackingIds || productData[2];
      resultSection.innerHTML = `<h3>${productName} (제품 ID: ${prodId})</h3>`;
      let compList = document.createElement("div");

      // 제품에 포함된 부속품들 조회 및 출력
      for (let compId of componentIds) {
        try {
          let compData = await contract.getComponent(compId);
          const compName = compData.name || compData[1];
          const origin = compData.origin || compData[2];
          const details = compData.details || compData[3];
          const processSteps = compData.processSteps || compData[4];
          let compDiv = document.createElement("div");
          compDiv.innerHTML = `<h4>${compName} (부속품 ID: ${compId})</h4>
                               <p><strong>원산지:</strong> ${origin}</p>
                               <p><strong>세부정보:</strong> ${details}</p>
                               <p><strong>유통/생산 과정:</strong></p>`;
          let stepsList = document.createElement("ul");
          if (processSteps.length > 0) {
            processSteps.forEach(step => {
              const date = new Date(step.timestamp * 1000).toLocaleString();
              let li = document.createElement("li");
              li.textContent = `${date} - ${step.description}`;
              stepsList.appendChild(li);
            });
          } else {
            let li = document.createElement("li");
            li.textContent = "유통 과정 정보가 없습니다.";
            stepsList.appendChild(li);
          }
          compDiv.appendChild(stepsList);
          compList.appendChild(compDiv);
        } catch (err) {
          let errorDiv = document.createElement("div");
          errorDiv.textContent = `부속품 ID ${compId} 조회 실패.`;
          compList.appendChild(errorDiv);
        }
      }
      resultSection.appendChild(compList);
    } catch (error) {
      // 제품 조회 실패 시 부속품으로 조회
      try {
        let compData = await contract.getComponent(input);
        const compName = compData.name || compData[1];
        const origin = compData.origin || compData[2];
        const details = compData.details || compData[3];
        const processSteps = compData.processSteps || compData[4];
        resultSection.innerHTML = `<h3>${compName} (부속품 ID: ${input})</h3>
                                   <p><strong>원산지:</strong> ${origin}</p>
                                   <p><strong>세부정보:</strong> ${details}</p>
                                   <p><strong>유통/생산 과정:</strong></p>`;
        let stepsList = document.createElement("ul");
        if (processSteps.length > 0) {
          processSteps.forEach(step => {
            const date = new Date(step.timestamp * 1000).toLocaleString();
            let li = document.createElement("li");
            li.textContent = `${date} - ${step.description}`;
            stepsList.appendChild(li);
          });
        } else {
          let li = document.createElement("li");
          li.textContent = "유통 과정 정보가 없습니다.";
          stepsList.appendChild(li);
        }
        resultSection.appendChild(stepsList);

        // 추가: 이 부속품이 사용된 제품들을 조회
        try {
          const usedProductIds = await contract.getProductsByComponent(input);
          if (usedProductIds.length > 0) {
            let usedSection = document.createElement("div");
            usedSection.innerHTML = `<h4>이 부속품이 사용된 제품 목록</h4>`;
            let ul = document.createElement("ul");
            for (let i = 0; i < usedProductIds.length; i++) {
              const pId = usedProductIds[i].toString();
              try {
                let productData = await contract.getProduct(pId);
                const pName = productData.name || productData[1];
                let li = document.createElement("li");
                li.textContent = `${pName} (제품 ID: ${pId})`;
                ul.appendChild(li);
              } catch (errProd) {
                let li = document.createElement("li");
                li.textContent = `제품 ID: ${pId}`;
                ul.appendChild(li);
              }
            }
            usedSection.appendChild(ul);
            resultSection.appendChild(usedSection);
          } else {
            let noUsed = document.createElement("p");
            noUsed.textContent = "이 부속품은 사용된 제품 정보가 없습니다.";
            resultSection.appendChild(noUsed);
          }
        } catch (err2) {
          console.error("부속품 사용 제품 조회 오류:", err2);
        }
      } catch (err2) {
        resultSection.innerHTML = `<p>입력한 트래킹 ID의 정보를 찾을 수 없습니다.</p>`;
      }
    }
  });
});

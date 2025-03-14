(async function() {
  // 1) MetaMask(또는 웹3 지갑) 연결
  if (typeof window.ethereum === "undefined") {
    d3.select("#treeSVG")
      .append("text")
      .attr("x", 20)
      .attr("y", 20)
      .text("MetaMask(또는 호환 지갑)가 설치되어 있지 않습니다.");
    return;
  }
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  // 2) 컨트랙트 정보 
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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

  // 3) 사용자 입력
  const inputId = prompt("조회할 트래킹 ID(또는 제품 ID)를 입력하세요");
  if (!inputId) {
    d3.select("#treeSVG")
      .append("text")
      .attr("x", 20)
      .attr("y", 20)
      .text("트래킹 ID가 입력되지 않았습니다.");
    return;
  }

  // 4) 트리 데이터 구성
  let treeData = {};
  try {
    // (A) 제품 조회
    let productData = await contract.getProduct(inputId);
    const prodId = productData.productId ? productData.productId.toString() : productData[0].toString();
    const productName = productData.name || productData[1];
    const componentIds = productData.componentTrackingIds || productData[2];

    // 루트 노드(제품)
    treeData = {
      name: `${productName} (제품 ID: ${prodId})`,
      children: []
    };

    // 부속품들
    for (let compId of componentIds) {
      try {
        let compData = await contract.getComponent(compId);
        const compName = compData.name || compData[1];
        const processSteps = compData.processSteps || compData[4];

        let compNode = {
          name: `${compName} (부속품 ID: ${compId})`,
          children: []
        };
        processSteps.forEach(step => {
          const dateStr = new Date(step.timestamp * 1000).toLocaleString();
          compNode.children.push({
            name: `${dateStr} - ${step.description}`
          });
        });
        treeData.children.push(compNode);

      } catch (err) {
        console.error(`부속품 ${compId} 조회 실패:`, err);
        treeData.children.push({ name: `부속품 ${compId} 조회 실패` });
      }
    }
  } catch (productError) {
    // (B) 부속품 단독 조회
    try {
      let compData = await contract.getComponent(inputId);
      const compName = compData.name || compData[1];
      const processSteps = compData.processSteps || compData[4];

      treeData = {
        name: `${compName} (부속품 ID: ${inputId})`,
        children: []
      };
      processSteps.forEach(step => {
        const dateStr = new Date(step.timestamp * 1000).toLocaleString();
        treeData.children.push({
          name: `${dateStr} - ${step.description}`
        });
      });
    } catch (err2) {
      d3.select("#treeSVG")
        .append("text")
        .attr("x", 20)
        .attr("y", 20)
        .text("입력한 트래킹 ID의 정보를 가져올 수 없습니다.");
      return;
    }
  }

  // 5) D3 트리 (가로 방향)
  // 여기서 margin.left를 200으로 늘려, 텍스트가 잘리지 않도록 함
  const margin = { top: 20, right: 50, bottom: 20, left: 200 },
        width = 1200 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

  const svg = d3.select("#treeSVG")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  let i = 0;
  const duration = 750;

  // 루트 노드
  let root = d3.hierarchy(treeData, d => d.children);
  // (세로축) 중앙
  root.x0 = height / 2;
  root.y0 = 0;

  // 가로 트리 설정
  const treemap = d3.tree()
    .size([height, width])
    .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

  // 자식 노드를 접어서 시작
  if (root.children) {
    root.children.forEach(collapse);
  }

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  update(root);

  // 업데이트 함수
  function update(source) {
    treemap(root);
    let nodes = root.descendants();
    let links = root.links();

    // x = 세로, y = 가로
    nodes.forEach(d => {
      d.x = d.x; // 세로 위치 그대로
      d.y = d.depth * 180; // 가로 방향 간격
    });

    // 1) 노드
    let node = svg.selectAll('g.node')
      .data(nodes, d => d.id || (d.id = ++i));

    // Enter
    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", d => `translate(${source.y0},${source.x0})`)
      .on("click", (event, d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      });

    // 원(circle)
    nodeEnter.append('circle')
      .attr('r', 1e-6)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff');

    // 텍스트
    nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children || d._children ? -13 : 13)
      .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
      .text(d => d.data.name)
      .style('fill-opacity', 1e-6);

    // Update
    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('circle')
      .attr('r', 10)
      .style('fill', d => d._children ? 'lightsteelblue' : '#fff')
      .style('stroke', 'steelblue')
      .style('stroke-width', 2);

    nodeUpdate.select('text')
      .style('fill-opacity', 1);

    // Exit
    let nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", d => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // 2) Links
    let link = svg.selectAll('path.link')
      .data(links, d => d.target.id);

    let linkEnter = link.enter().insert('path', "g")
      .attr('class', 'link')
      .attr('d', d => {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);
    linkUpdate.transition()
      .duration(duration)
      .attr('d', d => diagonal(d.source, d.target));

    link.exit().transition()
      .duration(duration)
      .attr('d', d => {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    // 이전 위치 저장
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // 가로 트리용 대각선
  function diagonal(s, d) {
    return `M ${s.y},${s.x}
            C ${(s.y + d.y) / 2},${s.x},
              ${(s.y + d.y) / 2},${d.x},
              ${d.y},${d.x}`;
  }
})();

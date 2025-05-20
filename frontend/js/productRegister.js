// frontend/js/productRegister.js

document.getElementById("addComponentBtn").addEventListener("click", () => {
    const container = document.getElementById("componentsContainer");
  
    const div = document.createElement("div");
    div.className = "componentBlock";
    div.innerHTML = `
      <hr />
      <input type="text" class="componentName" placeholder="부품 이름 (예: 배터리)" required />
      <input type="text" class="trackingId" placeholder="Tracking ID" required />
      <input type="text" class="usage" placeholder="사용량 (예: 3000mAh)" required />
      <input type="text" class="productionTime" placeholder="생산 시간 (예: 25분)" required />
      <textarea class="details" placeholder="세부 설명" required></textarea>
    `;
    container.appendChild(div);
  });
  
  document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const name = document.getElementById("productName").value.trim();
    if (!name) return alert("완성품 이름을 입력하세요.");
  
    const components = [];
    const blocks = document.querySelectorAll(".componentBlock");
  
    for (const block of blocks) {
      const componentName = block.querySelector(".componentName").value.trim();
      const trackingId = block.querySelector(".trackingId").value.trim();
      const usage = block.querySelector(".usage").value.trim();
      const productionTime = block.querySelector(".productionTime").value.trim();
      const details = block.querySelector(".details").value.trim();
  
      if (!(componentName && trackingId && usage && productionTime && details)) {
        return alert("모든 부속품 항목을 입력해야 합니다.");
      }
  
      components.push({
        componentName,
        trackingId,
        usage,
        productionTime,
        details
      });
    }
  
    const json = {
      finishedProducts: [
        {
          name,
          componentsUsage: components
        }
      ]
    };
  
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = `product_${name}_input.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
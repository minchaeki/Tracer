const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product");

const detailDiv = document.getElementById("productDetail");

if (!productId) {
  detailDiv.innerHTML = "<p>❌ productId가 전달되지 않았습니다.</p>";
  throw new Error("No product ID provided");
}

// 상단 네비게이션 동적 생성 (product.html에도 검색/트리/타임라인 버튼 추가)
const nav = document.createElement("nav");
nav.className = "nav-bar";
nav.innerHTML = `
  <button onclick="location.href='index.html'">홈</button>
  <button onclick="location.href='search.html'">정보 검색</button>
  <button onclick="location.href='tree.html'">재료 트리</button>
  <button onclick="location.href='timeline.html'">유통 타임라인</button>
`;
document.body.insertBefore(nav, detailDiv);

// mapping.json 불러오기
fetch("data/mapping.json")
  .then((res) => res.json())
  .then((mapping) => {
    const productInfo = mapping.finishedProducts?.[productId];

    if (!productInfo) {
      detailDiv.innerHTML = `<p>❌ 제품 ID ${productId} 에 해당하는 정보를 찾을 수 없습니다.</p>`;
      return;
    }

    const productHTML = [`<h3>📦 ${productInfo.name} (제품 ID: ${productId})</h3>`];

    productInfo.componentsUsage.forEach((comp) => {
      productHTML.push(`
        <div style="margin-bottom: 20px;">
          <h4>🔧 ${comp.componentName} (Tracking ID: ${comp.trackingId})</h4>
          <p><strong>사용량:</strong> ${comp.usage}</p>
          <p><strong>생산시간:</strong> ${comp.productionTime}</p>
          <p><strong>세부사항:</strong> ${comp.details}</p>
        </div>
      `);
    });

    detailDiv.innerHTML = productHTML.join("");
  })
  .catch((err) => {
    console.error("❌ mapping.json 로딩 실패:", err);
    detailDiv.innerHTML = "<p>❌ 데이터를 불러오는 중 오류가 발생했습니다.</p>";
  });

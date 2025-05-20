const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// 미들웨어
app.use(cors());
app.use(express.json());

// POST /upload
app.post("/upload", (req, res) => {
  const data = req.body;
  if (!data || !data.components || !data.components[0]) {
    return res.status(400).json({ error: "잘못된 데이터 형식입니다." });
  }

  const componentName = data.components[0].name;
  const filePath = path.join(__dirname, "../frontend/data", `${componentName}_input.json`);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
    if (err) {
      console.error("❌ 저장 실패:", err);
      return res.status(500).json({ error: "파일 저장 실패" });
    }
    console.log(`✅ ${componentName}_input.json 저장 완료`);
    res.json({ success: true, file: `${componentName}_input.json` });
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});

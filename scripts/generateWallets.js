// scripts/generateWallets.js
const fs = require("fs");
const path = require("path");
const { Wallet } = require("ethers");

const NUM_ADMINS = 4; // 생성할 지갑 수

function generateAdminWallets(count) {
  const wallets = [];

  for (let i = 0; i < count; i++) {
    const wallet = Wallet.createRandom();
    wallets.push({
      name: `관리자${i + 1}`,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }

  return wallets;
}

const wallets = generateAdminWallets(NUM_ADMINS);

// 저장할 경로 설정
const filePath = path.join(__dirname, "adminWallets.json");
fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2), "utf-8");

console.log(`✅ ${wallets.length}개의 관리자 지갑이 생성되었습니다.`);
console.log(`📁 저장 위치: ${filePath}`);
wallets.forEach(w => console.log(`🧾 ${w.name}: ${w.address}`));

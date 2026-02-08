# 🛡️ 이더리움 블록체인을 활용한 완제품 내 개별 부속품 단위 이력 관리 및 추적 솔루션

본 프로젝트는 제조 및 유통 과정에서 발생하는 부품 결함 문제를 해결하기 위해,  
**각 부속품의 생산·유통·조립 이력을 블록체인에 기록하여 투명성과 신뢰성을 보장하는 추적 시스템**을 구현한 연구 기반 프로젝트입니다.

본 시스템은 관련 연구 논문들을 직접 분석하고 설계한 아키텍처를 실제로 구현하였으며,  
**해당 구현 결과를 바탕으로 학회 논문으로 확장·발표**하였습니다.

---

## 📑 목차 (Table of Contents)

1. [프로젝트 개요](#-프로젝트-개요)  
2. [핵심 해결 과제](#-핵심-해결-과제)  
3. [시스템 아키텍처](#-시스템-아키텍처)  
4. [주요 기능 구현](#-주요-기능-구현)  
5. [데이터 구조 및 시각화](#-데이터-구조-및-시각화)  
6. [기술 스택](#-기술-스택)  
7. [기대 효과](#-기대-효과)  
8. [시현](#-시현)  
9. [논문](#-논문)  

---

## 💡 프로젝트 개요

최근 전자기기 및 의료기기 분야에서 **부품 결함으로 인한 대규모 리콜 사례**가 증가하면서,  
부속품 단위의 정밀한 이력 관리와 추적 시스템의 필요성이 강조되고 있습니다.

본 프로젝트는 **이더리움 블록체인과 스마트 컨트랙트**를 활용하여  
각 부속품의 생산 정보, 공정 단계, 조립 이력을 **위·변조가 불가능한 형태로 기록**하고,  
MetaMask 기반 웹 인터페이스를 통해 관리자와 사용자가 실시간으로 데이터를 등록·검증할 수 있도록 설계되었습니다.

---

## 🎯 핵심 해결 과제

### 🔐 데이터 무결성 확보
- 중앙 서버 기반 시스템의 위·변조 위험 제거
- 이더리움 테스트넷의 **분산 원장 구조**를 활용한 데이터 신뢰성 확보

### 🔍 추적 가능성 (Traceability)
- 원재료 출처 불명 및 공급망 정보 단절 문제 해결
- **부속품 단위 이력 추적 체계** 구축

### ⚙ 공정 자동화
- 스마트 컨트랙트를 통한 조건 기반 자동 실행
- 신뢰 가능한 데이터 처리 및 검증 환경 제공

---

## 🏗 시스템 아키텍처

시스템은 **관리자(Administrator)** 와 **사용자(User)** 인터페이스로 구성되며,블록체인 레이어를 중심으로 유기적으로 작동합니다.

### 관리자 (Manager)
- 부속품의 원산지, 공정 단계, 세부 설명 입력
- MetaMask를 통한 디지털 서명
- 스마트 컨트랙트 호출 후 블록체인에 데이터 등록

### 사용자 (User)
- 완제품 QR 코드 또는 고유 Tracking ID 조회
- 부속품 단위의 계층적 이력 조회
- 웹 UI를 통한 시각화된 정보 확인

---

## 🛠 주요 기능 구현

### 1️⃣ 스마트 컨트랙트 및 블록체인 연동
- **Solidity Smart Contract**
  - 부속품 등록 및 조립 정보 관리
  - 위·변조 불가능한 데이터 저장 구조
- **Ether.js**
  - 프론트엔드–블록체인 통신
  - 트랜잭션 처리 및 지갑 연동

---

### 2️⃣ 관리자 데이터 입력 (Admin UI)
- 제품명, 원산지, 공정 단계, 상세 설명 입력
- MetaMask 서명 기반 데이터 등록

---

### 3️⃣ 사용자 이력 조회 (User UI)
- QR 코드 스캔 또는 Tracking ID 기반 조회
- 부속품별 공정 이력 타임라인 출력
- 계층적 구조 시각화 제공

---

## 📊 데이터 구조 및 시각화

### 데이터 구조 (JSON Format)

부속품 정보는 다음과 같은 구조로 블록체인에 저장됩니다.

```json
{
  "componentName": "Battery",
  "usage": "3000mAh",
  "productionTime": "2025-04-22 11:04:06",
  "details": "Quality inspection and packaging completed"
}
```

## 🌳 트리 구조 시각화

- 완제품을 **루트 노드(Root Node)** 로 설정
- 하위 부속품 및 각 공정 단계가 연결된 **계층적 트리 구조**로 표현
- 생산 → 유통 → 조립 흐름을 직관적으로 확인 가능

<img width="1080" height="642" alt="스크린샷 2026-02-09 오전 2 42 29" src="https://github.com/user-attachments/assets/ee011cb5-a806-4c9b-9945-91794ddef0e8" />

아래와 같이 트리화된 구조로 확인가능 

---


## 🛠 기술 스택

| Category | Stack |
| :--- | :--- |
| **Blockchain** | ![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?style=flat-square&logo=ethereum&logoColor=white) ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white) ![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=flat-square&logo=hardhat&logoColor=black) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Ethers.js](https://img.shields.io/badge/Ethers.js-2535A0?style=flat-square) |
| **Wallet** | ![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=flat-square&logo=metamask&logoColor=white) |

---

## 🚀 기대 효과

### 🔧 신속한 리콜 대응
- 결함 부속품의 원인 분석 및 추적 시간 단축
- 공급망 전반의 신속한 대응 가능

### 🔐 소비자 신뢰도 향상
- 제조 공정 정보의 투명한 공개
- 제품 신뢰성 및 브랜드 가치 제고

### 🧩 통합 이력 관리 체계 구축
- 자재 조달부터 소비자 전달까지
- 전 공정을 아우르는 이력 관리 기반 마련

---

## 🎬 시현

본 프로젝트는 **실제 동작하는 웹 기반 시스템**으로 구현되었습니다.

### 1️⃣ 로그인 화면
- MetaMask 기반 사용자 인증
- 관리자 / 사용자 역할 분리

<img width="380" height="463" alt="스크린샷 2026-02-09 오전 2 41 42" src="https://github.com/user-attachments/assets/3537e2e0-882b-44e3-91a5-992ee22e2616" />

MetaMask 기반 사용자 인증으로 관리자와 사용자 역할 분리했습니다.
  
---

### 2️⃣ 부속품 이력 등록

<img width="1102" height="614" alt="스크린샷 2026-02-09 오전 2 40 58" src="https://github.com/user-attachments/assets/3cdf541e-bc30-40dc-8a84-b916d62bc164" />

부속품 정보 입력 후 블록체인에 등록 합니다.

---

### 3️⃣ 사용자: 이력 조회
<img width="1217" height="631" alt="스크린샷 2026-02-09 오전 2 39 43" src="https://github.com/user-attachments/assets/ace32e6b-5dd0-41ce-9612-4a40a98cea72" />

시리얼 넘버 입력을 통해 검색을 할 수 있습니다

<img width="879" height="696" alt="스크린샷 2026-02-09 오전 2 43 40" src="https://github.com/user-attachments/assets/92af0c32-8dc4-4eb5-8f44-1b564700b05b" />

<img width="1098" height="606" alt="스크린샷 2026-02-09 오전 2 44 19" src="https://github.com/user-attachments/assets/eb7ec4ce-6d0c-4114-bcd9-96ee8459ee6c" />

검색 시 정보를 다양한 시각화 자료로 볼 수 있습니다.

---

## 📄 논문

본 프로젝트는 **논문을 단순 구현한 사례가 아니라**,직접 연구·설계·구현한 시스템을 기반으로 **학술 논문으로 확장한 연구 결과**입니다.

### 🏛 학회 정보
- **학회명**: 한국정보기술학회 (KIIT)
- **발표처**: 한국정보기술학회 종합학술대회 논문집
- **발표 연도**: 2025
- **논문 제목**: 블록체인 기반 전자 부품 단위 이력 추적 시스템 설계 및 구현

### 📎 논문 PDF
👉 [학술대회논문.pdf](https://github.com/userattachments/files/25163158/default.pdf)


# 🛡️ Tracer: 블록체인 기반 제품 이력 추적 시스템

본 프로젝트는 제조 및 유통 과정에서 발생하는 **부품 결함·리콜 문제**를 해결하기 위해, **부속품 단위의 생산·유통·조립 이력을 블록체인에 기록**하여 **투명성, 무결성, 추적 가능성**을 보장하는 **연구 기반 추적 시스템**입니다.

📌 단순 구현 프로젝트가 아니라,  
**기존 연구 논문 분석 → 시스템 아키텍처 설계 → 실제 구현 → 학회 논문 발표**까지 전 과정을 수행한 **연구·개발 통합 프로젝트**입니다.

---

## 📑 Table of Contents

1. [프로젝트 개요](#-프로젝트-개요)
2. [문제 정의 및 해결 과제](#-문제-정의-및-해결-과제)
3. [시스템 전체 아키텍처](#-시스템-전체-아키텍처)
4. [주요 기능](#-주요-기능)
5. [데이터 구조 및 시각화](#-데이터-구조-및-시각화)
6. [기술 스택](#-기술-스택)
7. [기대 효과](#-기대-효과)
8. [시스템 시현](#-시스템-시현)
9. [시작하기 (Getting Started)](#-시작하기-getting-started)
10. [사용 방법](#-사용-방법)
11. [API 문서](#-api-문서)
12. [코드 컨벤션](#-코드-컨벤션)
13. [문제 해결 (Troubleshooting)](#-문제-해결-troubleshooting)
14. [논문 정보](#-논문-정보)

---

## 💡 프로젝트 개요

전자기기·의료기기 산업에서는 **단일 부품 결함이 대규모 리콜로 확산되는 사례**가 지속적으로 발생하고 있습니다.

하지만 기존 시스템은  
- 중앙 서버 의존
- 이력 위·변조 가능성
- 부속품 단위 추적의 한계  

라는 구조적 문제를 가지고 있습니다.

### 🔗 해결 접근
본 프로젝트는 **Ethereum 블록체인 + 스마트 컨트랙트**를 활용하여 각 부속품의 **생산 → 유통 → 조립 → 소유권 이전 이력**을 **변조 불가능한 온체인 데이터**로 관리합니다.

또한 **MetaMask 기반 웹 인터페이스**를 통해 관리자와 사용자가 실시간으로 데이터를 등록·검증할 수 있도록 설계했습니다.

---

## 🎯 문제 정의 및 해결 과제

### 🔐 데이터 무결성 확보
- 중앙 집중형 시스템의 신뢰 한계
- 블록체인 **분산 원장 구조**를 통한 위·변조 방지

### 🔍 추적 가능성 (Traceability)
- 원재료 및 부속품 출처 불명 문제 해결
- **부속품 단위 이력 추적 체계** 구축

### ⚙ 공정 자동화 및 신뢰성
- 스마트 컨트랙트 기반 조건부 실행
- 인위적 개입 없는 검증 가능한 기록 관리

---

## 🏗 시스템 전체 아키텍처

본 시스템은 **3-Tier 아키텍처**로 구성됩니다.

### 1️⃣ Frontend (Client)
- **기술:** HTML, CSS, JavaScript, Ethers.js
- **역할**
  - MetaMask 연동
  - 제품 등록 / 검색 / 타임라인 시각화
  - 스마트 컨트랙트 직접 호출

### 2️⃣ Backend (Server)
- **기술:** Node.js, Express.js
- **역할**
  - 오프체인 데이터 관리
  - AIBOM JSON 파일 저장
  - QR 코드 생성 및 데이터 매핑

### 3️⃣ Blockchain
- **기술:** Ethereum, Solidity, Hardhat
- **역할**
  - 제품·부속품 이력 온체인 저장
  - 소유권 이전 및 이벤트 기록
  - 불변성·투명성 보장

---

## ⚙ 주요 기능

- 🧾 **제품 및 부속품 등록**
  - 생산 정보 및 초기 소유권 온체인 등록

- 🔄 **소유권 이전 관리**
  - 유통 단계별 소유권 변경 기록

- 🔍 **이력 추적**
  - 생성부터 현재 상태까지 전체 타임라인 조회

- 📱 **QR 코드 생성**
  - QR 스캔을 통한 온체인 이력 접근

- 🌐 **웹 기반 UI**
  - 관리자 / 사용자 역할 분리
  - 직관적인 시각화 제공

---

## 📊 데이터 구조 및 시각화

### 📄 데이터 구조 (JSON)

```json
{
  "componentName": "Battery",
  "usage": "3000mAh",
  "productionTime": "2025-04-22 11:04:06",
  "details": "Quality inspection and packaging completed"
}
```

## 🌳 트리 구조 시각화 (Component Traceability Tree)

본 시스템은 완제품을 **Root Node**로 설정하고,하위에 각 **부속품(Component)** 및 **공정 단계(Process)** 를 연결한 **계층적 트리(Tree) 구조**로 이력을 시각화합니다.

이를 통해 단일 부속품이  
👉 **어디에서 생산되었고**  
👉 **어떤 공정을 거쳤으며**  
👉 **어떤 완제품에 조립되었는지**  
를 직관적으로 추적할 수 있습니다.

### 🔎 시각화 특징
- 완제품 기준 **Top-Down 구조**
- 부속품 및 공정 단계의 **연결 관계 명확화**
- 생산 → 유통 → 조립 흐름을 한눈에 파악 가능
- 결함 발생 시 **문제 부속품 즉시 식별**

<img width="1080" height="642" alt="component-tree-visualization" src="https://github.com/user-attachments/assets/ee011cb5-a806-4c9b-9945-91794ddef0e8" />

> 📌 위와 같은 트리 구조를 통해 특정 부속품 단위까지 이력 추적이 가능하도록 설계되었습니다.

---

## 🛠 기술 스택 (Tech Stack)

| Category | Stack |
|--------|------|
| **Blockchain** | ![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?style=flat-square&logo=ethereum&logoColor=white) ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white) ![Hardhat](https://img.shields.io/badge/Hardhat-FFF100?style=flat-square&logo=hardhat&logoColor=black) |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Ethers.js](https://img.shields.io/badge/Ethers.js-2535A0?style=flat-square) |
| **Backend** | Node.js, Express.js |
| **Wallet** | ![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=flat-square&logo=metamask&logoColor=white) |

---

## 🚀 기대 효과 (Expected Impact)

### 🔧 신속한 리콜 대응
- 결함 부속품의 위치 및 사용 제품 즉시 식별
- 리콜 범위 최소화 및 비용 절감

### 🔐 소비자 신뢰도 향상
- 제조·유통 이력의 투명한 공개
- 제품 신뢰성 및 브랜드 가치 강화

### 🧩 통합 이력 관리 체계
- 자재 조달부터 소비자 전달까지
- 전 공정 단일 추적(End-to-End Traceability) 가능

---

## 🎬 시스템 시현 (Demo)

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
<img width="1217" height="631" alt="search" src="https://github.com/user-attachments/assets/ace32e6b-5dd0-41ce-9612-4a40a98cea72" />

시리얼 넘버 입력을 통해 검색을 할 수 있습니다

#### 📊 시각화 결과
<img width="879" height="696" alt="timeline" src="https://github.com/user-attachments/assets/92af0c32-8dc4-4eb5-8f44-1b564700b05b" />

<img width="1098" height="606" alt="tree-view" src="https://github.com/user-attachments/assets/eb7ec4ce-6d0c-4114-bcd9-96ee8459ee6c" />

검색 시 정보를 다양한 시각화 자료로 볼 수 있습니다.

---

## 📄 논문 정보 (Publication)

본 프로젝트는 **단순 구현 사례가 아니라**,직접 설계·구현한 시스템을 기반으로 **학술 논문으로 확장**한 연구 결과입니다.

### 🏛 학회 정보
- **학회명:** 한국정보기술학회 (KIIT)
- **발표처:** 한국정보기술학회 종합학술대회 논문집
- **발표 연도:** 2025

### 📝 논문 제목
> **블록체인 기반 전자 부품 단위 이력 추적 시스템 설계 및 구현**

### 📎 논문 PDF
👉 [논문 PDF 바로가기](https://github.com/userattachments/files/25163158/default.pdf)

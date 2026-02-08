# 🛡️ Tracer: 블록체인 기반 제품 이력 추적 시스템

본 프로젝트는 제조 및 유통 과정에서 발생하는 **부품 결함·리콜 문제**를 해결하기 위해, **부속품 단위의 생산·유통·조립 이력을 블록체인에 기록**하여 **투명성, 무결성, 추적 가능성**을 보장하는 **연구 기반 추적 시스템**입니다.

📌 단순 구현 프로젝트가 아니라,  
**기존 연구 논문 분석 → 시스템 아키텍처 설계 → 실제 구현 → 학회 논문 발표**까지 전 과정을 수행한 **연구·개발 통합 프로젝트**입니다.

---

## 📑 Table of Contents

1.  [프로젝트 개요](#-프로젝트-개요)
2.  [문제 정의 및 해결 과제](#-문제-정의-및-해결-과제)
3.  [시스템 전체 아키텍처](#-시스템-전체-아키텍처)
4.  [주요 기능](#-주요-기능)
5.  [데이터 구조 및 시각화](#-데이터-구조-및-시각화)
6.  [기술 스택](#-기술-스택)
7.  [Smart Contract](#-Smart-Contract)
8.  [기대 효과](#-기대-효과)
9.  [시스템 시현](#-시스템-시현)
10. [시작하기 (Getting Started)](#-시작하기-getting-started)
11. [사용 방법](#-사용-방법)
12. [API 문서](#-api-문서)
13. [코드 컨벤션](#-코드-컨벤션)
14. [기여하기](#-기여하기)
15. [문제 해결 (Troubleshooting)](#-문제-해결-troubleshooting)
16. [논문 정보](#-논문-정보)

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

## 📜 Smart Contract

본 프로젝트의 핵심은 **Solidity**로 작성된 스마트 계약에 있습니다. 스마트 계약은 블록체인 상에서 실행되는 프로그램으로, Tracer 시스템에서는 다음과 같은 역할을 수행합니다.

*   **데이터의 불변성 보장:** 한번 기록된 제품 및 부속품의 이력 데이터는 위조하거나 변조할 수 없습니다.
*   **투명한 소유권 이전:** 모든 소유권 이전 기록은 블록체인에 공개적으로 기록되어 투명하게 검증될 수 있습니다.
*   **신뢰할 수 있는 데이터 관리:** 중앙 기관 없이, 분산된 네트워크 참여자들이 데이터의 유효성을 검증합니다.
*   **자동화된 로직:** 특정 조건이 충족되면 미리 정의된 로직에 따라 자동으로 기능이 실행됩니다. (예: 제품 등록, 소유권 이전)

`contracts` 디렉토리에는 `Traceability.sol`과 같은 주요 스마트 계약 파일들이 포함되어 있으며, 이들은 제품의 라이프사이클을 관리하고 필요한 데이터를 블록체인에 기록하는 로직을 담당합니다.

### `Traceability.sol` 스마트 계약 상세 설명

`Traceability.sol` 계약은 Tracer 시스템의 핵심 로직을 담당하며, 제품 및 부속품의 생산 및 유통 이력을 블록체인에 기록하고 관리합니다.

#### 주요 데이터 구조 (Structs)

1.  **`ProcessStep`**: 제품 또는 부속품의 공정 단계를 나타냅니다.
    *   `timestamp` (uint256): 공정 단계가 기록된 블록 시간 (Unix 타임스탬프).
    *   `description` (string): 해당 공정 단계에 대한 설명 (예: "조립 완료", "품질 검사 통과").

2.  **`Component`**: 개별 부속품에 대한 정보를 담습니다.
    *   `trackingId` (uint256): 부속품의 고유 식별자.
    *   `name` (string): 부속품의 이름.
    *   `origin` (string): 부속품의 원산지 또는 생산지.
    *   `details` (string): 부속품에 대한 추가적인 상세 정보.
    *   `processSteps` (ProcessStep[]): 해당 부속품이 거친 모든 공정 단계의 목록.

3.  **`Product`**: 최종 완제품에 대한 정보를 담습니다.
    *   `productId` (uint256): 완제품의 고유 식별자.
    *   `name` (string): 완제품의 이름.
    *   `componentTrackingIds` (uint256[]): 이 완제품을 구성하는 모든 부속품의 `trackingId` 목록.

#### 핵심 상태 변수 (State Variables)

*   `globalId` (uint256): `Component`와 `Product`에 고유한 `trackingId` 또는 `productId`를 할당하기 위한 전역 카운터.
*   `componentCount` (uint256): 총 등록된 부속품의 개수.
*   `productCount` (uint256): 총 등록된 완제품의 개수.
*   `components` (mapping(uint256 => Component)): `trackingId`를 키로 사용하여 `Component` 구조체에 접근할 수 있는 매핑.
*   `products` (mapping(uint256 => Product)): `productId`를 키로 사용하여 `Product` 구조체에 접근할 수 있는 매핑.
*   `productsByComponent` (mapping(uint256 => uint256[])): 특정 부속품 (`trackingId`)이 어떤 완제품 (`productId`)에 사용되었는지 역추적하기 위한 매핑.

#### 주요 함수 (Functions)

1.  **`createComponent(string memory _name, string memory _origin, string memory _details, string[] memory _processDescriptions)`**
    *   **기능:** 새로운 부속품을 블록체인에 등록하고 초기 공정 단계를 기록합니다.
    *   **반환:** 새로 생성된 부속품의 `trackingId`.

2.  **`addProcessStep(uint256 _trackingId, string memory _description)`**
    *   **기능:** 특정 부속품 (`_trackingId`)에 새로운 공정 단계를 추가합니다. 이는 부속품의 라이프사이클 이력을 업데이트하는 데 사용됩니다.

3.  **`createProduct(string memory _name, uint256[] memory _componentTrackingIds)`**
    *   **기능:** 새로운 완제품을 등록하고, 이 완제품을 구성하는 모든 부속품 (`_componentTrackingIds`)과 연결합니다. 또한 `productsByComponent` 매핑을 업데이트하여 부속품으로부터 완제품을 추적할 수 있도록 합니다.
    *   **반환:** 새로 생성된 완제품의 `productId`.

4.  **조회 함수 (View Functions)**
    *   `getComponent(uint256 _trackingId)`: 특정 `trackingId`의 부속품 정보를 조회합니다.
    *   `getProduct(uint256 _productId)`: 특정 `productId`의 완제품 정보를 조회합니다.
    *   `getProcessSteps(uint256 _trackingId)`: 특정 부속품의 모든 공정 단계를 조회합니다.
    *   `getProductsByComponent(uint256 _trackingId)`: 특정 부속품이 사용된 모든 완제품의 `productId` 목록을 조회합니다.

#### 이벤트 (Events)

*   `ComponentCreated(uint256 trackingId, string name)`: 부속품이 성공적으로 생성되었을 때 발생합니다.
*   `ProductCreated(uint256 productId, string name, uint256[] componentTrackingIds)`: 완제품이 성공적으로 생성되었을 때 발생합니다.
*   `ProcessStepAdded(uint256 trackingId, string description, uint256 timestamp)`: 공정 단계가 부속품에 추가되었을 때 발생합니다.
    이 이벤트들은 외부 애플리케이션(프론트엔드, 백엔드 서버)에서 블록체인 상의 데이터 변경 사항을 실시간으로 모니터링하고 반응하는 데 사용될 수 있습니다.

이 계약은 부속품과 완제품 간의 복잡한 관계를 블록체인 상에서 효율적으로 모델링하고, 각 단계의 이력을 불변하게 기록하여 제품의 투명한 추적 가능성을 보장합니다.

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
<img width="1217" height="631" alt="search" src="https://github.com/user-attachments/assets/ace32e6b-5dd0-41ce-9612-4a40a968cea72" />

시리얼 넘버 입력을 통해 검색을 할 수 있습니다

#### 📊 시각화 결과
<img width="879" height="696" alt="timeline" src="https://github.com/user-attachments/assets/92af0c32-8dc4-4eb5-8f44-1b564700b05b" />

<img width="1098" height="606" alt="tree-view" src="https://github.com/user-attachments/assets/eb7ec4ce-6d0c-4114-bcd9-96ee8459ee6c" />

검색 시 정보를 다양한 시각화 자료로 볼 수 있습니다.

---

## 🚀 시작하기 (Getting Started)

로컬 환경에서 Tracer 시스템을 설정하고 실행하는 방법은 다음과 같습니다.

### 사전 요구사항

*   **Node.js:** (LTS 버전 권장, 예: v18.x 또는 v20.x)
    [Node.js 다운로드](https://nodejs.org/en/download/)
*   **npm:** (Node.js 설치 시 함께 설치됨) 또는 **Yarn**
*   **Git:**
    [Git 다운로드](https://git-scm.com/downloads)
*   **MetaMask:** 브라우저 확장 프로그램
    [MetaMask 설치](https://metamask.io/download/)

### 설치

1.  **저장소 복제:**

    ```bash
    git clone https://github.com/your-username/Tracer.git # 실제 저장소 URL로 교체하세요.
    cd Tracer
    ```

2.  **의존성 패키지 설치:**

    프로젝트 루트에서 Hardhat 및 스마트 계약 관련 의존성을 설치합니다.
    ```bash
    npm install
    ```

    `server` 디렉토리로 이동하여 백엔드 의존성을 설치합니다.
    ```bash
    cd server
    npm install
    cd ..
    ```

### 스마트 계약 배포

이 프로젝트는 Hardhat Ignition을 사용하여 스마트 계약을 배포합니다.

1.  **스마트 계약 컴파일:**

    ```bash
    npx hardhat compile
    ```

2.  **로컬 Hardhat 네트워크 실행:**

    테스트를 위해 로컬 개발 블록체인을 사용하는 것이 좋습니다. 새 터미널을 열고 다음 명령을 실행하세요.
    ```bash
    npx hardhat node
    ```
    이 명령은 여러 개의 테스트 계정과 개인 키를 출력합니다. MetaMask에서 이 네트워크와 계정을 가져와서 사용하세요.

3.  **Hardhat Ignition을 사용한 계약 배포:**

    원래 터미널에서 `Traceability` 계약을 배포합니다.
    ```bash
    npx hardhat ignition deploy ignition/modules/TraceabilityModule.js --network localhost
    ```
    배포 성공 시, 터미널에 배포된 계약 주소가 출력됩니다. 이 주소는 프론트엔드 및 백엔드 설정에 필요하므로 기록해두세요. 배포 정보는 `ignition/deployments/localhost/deployed_addresses.json` 파일에서도 확인할 수 있습니다.

### 백엔드 서버 실행

백엔드 서버는 API 엔드포인트를 제공하고, QR 코드 생성이나 데이터 매핑과 같이 블록체인과 직접 관련 없는 상호작용을 처리합니다.

1.  **백엔드 서버 시작:**

    ```bash
    cd server
    node index.js
    ```
    서버는 기본적으로 `http://localhost:3001`에서 실행됩니다.

### 프론트엔드 실행

프론트엔드는 배포된 스마트 계약 및 백엔드 서버와 상호작용하는 정적 웹 애플리케이션입니다.

1.  **관리자 지갑 생성 (선택 사항):**

    프론트엔드 실행 전에 관리자 지갑 주소를 생성할 수 있습니다. 이 정보는 `frontend/data/adminWallets.json`에 저장됩니다.
    ```bash
    node scripts/generateWallets.js
    ```

2.  **프론트엔드 서버 시작:**

    `http-server`와 같은 로컬 웹 서버를 통해 프론트엔드를 실행하는 것이 가장 좋습니다.

    *   **`http-server` 설치 (전역):**
        ```bash
        npm install -g http-server
        ```
    *   **`frontend` 디렉토리에서 서버 시작:**
        ```bash
        cd frontend
        http-server
        ```
        웹 브라우저를 열고 `http://localhost:8080` (또는 `http-server`가 표시한 포트)으로 이동하세요.

---

## 📖 사용 방법

Tracer 애플리케이션과 상호작용하는 방법입니다. Hardhat 로컬 노드, 백엔드 서버, 프론트엔드 서버가 모두 실행 중인지 확인하세요.

1.  **관리자 패널 접근:**
    *   `admin/admin.html` (예: `http://localhost:8080/admin/admin.html`)로 이동하여 배포된 계약 주소 설정 등 관리 기능을 사용합니다.

2.  **새 제품 등록:**
    *   제품 등록 페이지 (`http://localhost:8080/productRegister.html`)로 이동합니다.
    *   제품 세부 정보를 입력하고 제출하면 블록체인에 제품이 등록됩니다.

3.  **QR 코드 생성:**
    *   `scripts/storeData.js` 스크립트를 사용하여 제품 데이터를 저장하고 QR 코드를 생성할 수 있습니다. 스크립트 실행 전, `scripts/storeData.js` 파일을 검토하여 필요한 설정 (예: 계약 주소, 제품 상세 정보)을 확인하세요.
        ```bash
        node scripts/storeData.js
        ```

4.  **제품 검색:**
    *   검색 페이지 (`http://localhost:8080/search.html`)에서 제품 ID 등으로 제품을 찾습니다.

5.  **제품 이력 조회:**
    *   제품 상세 페이지나 `timeline.html`에서 특정 제품의 전체 소유권 이전 기록을 볼 수 있습니다.

6.  **제품 소유권 이전:**
    *   (이 기능은 일반적으로 제품 상세 페이지 또는 관리자 인터페이스에서 접근 가능합니다.) 현재 제품 ID와 새 소유자의 주소를 제공하여 블록체인에 이전을 기록합니다.

---

## 📑 API 문서

백엔드 서버는 다음과 같은 API 엔드포인트를 제공합니다.

### `POST /upload`

AIBOM 데이터를 서버에 업로드하고 JSON 파일로 저장합니다.

*   **URL:** `/upload`
*   **Method:** `POST`
*   **Content-Type:** `application/json`
*   **Request Body:**
    ```json
    {
      "components": [
        {
          "name": "ComponentA",
          "part_id": "P123",
          "supplier": "SupplierX",
          "materials": [
            {
              "name": "Material1",
              "origin": "CountryY"
            }
          ]
        }
      ]
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "success": true,
      "file": "ComponentA_input.json"
    }
    ```
*   **Error Response (400 Bad Request):**
    ```json
    {
      "error": "잘못된 데이터 형식입니다."
    }
    ```
*   **Error Response (500 Internal Server Error):**
    ```json
    {
      "error": "파일 저장 실패"
    }
    ```

---

## 📏 코드 컨벤션

이 프로젝트는 일관성 있는 코드 스타일을 유지하기 위해 다음 컨벤션을 따릅니다.

*   **JavaScript (ES6+):**
    *   **포맷팅:** Prettier (기본 설정) 사용을 권장합니다.
    *   **네이밍:**
        *   변수, 함수: `camelCase` (예: `productData`)
        *   클래스, 컴포넌트: `PascalCase` (예: `ProductTimeline`)
        *   상수: `UPPER_CASE` (예: `CONTRACT_ADDRESS`)
    *   **모듈:** ES6 `import`/`export` 사용을 지향합니다.

*   **Solidity:**
    *   **포맷팅:** `prettier-plugin-solidity` 사용을 권장합니다.
    *   **네이밍:**
        *   계약, 라이브러리, 구조체: `PascalCase`
        *   함수, 변수: `camelCase`
        *   이벤트: `PascalCase`
    *   **가시성:** 함수와 상태 변수의 가시성(`public`, `private`, `internal`, `external`)을 명확하게 지정해야 합니다.

---

## 🤝 기여하기

프로젝트에 기여하고 싶으시면 다음 절차를 따라주세요.

1.  **이슈 생성:** 버그 리포트나 기능 제안은 GitHub Issues를 통해 제출해주세요.
2.  **저장소 Fork & Clone:** 이 저장소를 Fork한 후, 로컬 머신에 Clone하세요.
3.  **브랜치 생성:** 새로운 기능이나 버그 수정을 위한 브랜치를 만드세요. (`git checkout -b feature/new-feature` 또는 `fix/bug-name`)
4.  **코드 수정 및 커밋:** 변경 사항을 적용하고, 의미 있는 커밋 메시지와 함께 커밋하세요.
5.  **Push & Pull Request:** 작업 브랜치를 자신의 Fork된 저장소에 Push한 후, 원본 저장소로 Pull Request(PR)를 생성해주세요.

---

## ⚠️ 문제 해결 (Troubleshooting)

다음은 개발 또는 테스트 중에 발생할 수 있는 몇 가지 일반적인 문제와 해결 방법입니다.

1.  **관리자 MetaMask 로그인이 되지 않는 경우**
    *   **원인:** MetaMask가 로컬 Hardhat 네트워크에 연결되지 않았거나, 잘못된 계정이 선택되었을 수 있습니다.
    *   **해결 방법:**
        1.  MetaMask에서 현재 네트워크가 "Localhost 8545" (또는 Hardhat 노드가 사용하는 체인 ID)로 설정되어 있는지 확인하세요.
        2.  `npx hardhat node` 실행 시 출력된 테스트 계정 중 하나를 MetaMask로 "개인 키 가져오기"를 통해 추가했는지 확인하세요.
        3.  `frontend/data/adminWallets.json` 파일에 등록된 관리자 지갑 주소와 MetaMask에서 현재 선택된 계정 주소가 일치하는지 확인하세요.

2.  **AIBOM 데이터 등록이 실패하는 경우**
    *   **원인:** 백엔드 서버가 실행 중이지 않거나, 전송된 데이터 형식이 잘못되었을 수 있습니다.
    *   **해결 방법:**
        1.  `cd server && node index.js` 명령을 통해 백엔드 서버가 정상적으로 실행 중인지 터미널에서 확인하세요.
        2.  프론트엔드에서 백엔드로 보내는 `fetch` 요청의 본문(body)이 API 문서에 명시된 JSON 형식과 일치하는지 개발자 도구(F12)의 'Network' 탭에서 확인하세요.
        3.  서버 터미널에 `파일 저장 실패`와 같은 에러 메시지가 출력되는지 확인하여 파일 시스템 권한 문제를 점검하세요.

3.  **검색 결과가 화면에 올바르게 표시되지 않는 경우**
    *   **원인:** 스마트 계약 주소가 프론트엔드에 잘못 설정되었거나, 블록체인과의 통신(RPC 호출)에 문제가 발생했을 수 있습니다.
    *   **해결 방법:**
        1.  브라우저 개발자 도구(F12)의 'Console' 탭을 열어 `RPC Error`, `Contract not found` 등과 같은 오류 메시지가 있는지 확인하세요.
        2.  프론트엔드의 JavaScript 파일 (예: `search.js` 또는 공통 설정 파일)에 하드코딩되거나 설정된 스마트 계약 주소가 `npx hardhat ignition deploy` 실행 시 출력된 주소와 동일한지 확인하세요.
        3.  MetaMask가 올바른 네트워크에 연결되어 있고, 해당 네트워크에서 계약이 실제로 배포되었는지 확인하세요.

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

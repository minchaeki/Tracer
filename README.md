<<<<<<< HEAD

=======
# Tracer
심화캡스톤
>>>>>>> 0ca89d4462dd6c7f23a0a92c5f5fe7ee92d3797e


# 준비 사항

git 과 wsl 설치 상태여야 합니다.

vscode에 LiverServer 확장해주세요.

nodejs 설치 상태여야 합니다.

nodejs는 22.13.1 버전

npm은 11.0.0 버전

설치가 안되어 있다면 공식 홈페이지를 통해 설치해주세요.

# 실행 방법

1. 프로젝트 클론 및 의존성 설치

```shell
git clone https://github.com/minchaeki/Tracer.git
cd 프로젝트명(파일명)
npm install
```

2. Hardhat 및 로컬 네트워크 실행

cmd 창을 열고 다음과 같이 쳐주세요.

```shell
wsl
cd 프로젝트명(파일명)
npx hardhat node
```

"""(노드 생성시 1분 가량 시간이 소요 될 수 있습니다.)"""

3. 컨트랙트 배포

vscode로 폴더를 열고 터미널을 킵니다.(ctrl+~)

터미널에 다음과 같이 쳐주세요.

```shell
wsl
npx hardhat ignition deploy ./ignition/modules/TraceabilityModule.js --network localhost
npx hardhat run scripts/storeData.js --network localhost
```

"""(각 배포 1분 가량 시간이 소요 될 수 있습니다.)"""

참고: 위 명령어들은 모두 프로젝트 루트 디렉토리에서 실행해야 합니다. Hardhat이 로컬 네트워크(localhost)에 연결되어 있는지 확인하세요.

5. 실행

index.html을 우클릭하고 Open with Live Server를 클릭하세요 실행 됩니다.

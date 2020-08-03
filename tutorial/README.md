# 테스트 튜토리얼
해당 테스트는 Level들로 이루어져 있습니다. Level의 달성량을 채우면서 테스트 코드에 대해서 학습할 수 있습니다.

## 시작하기

의존성을 설치해주세요 :)
```
npm i
```

테스트만 할 경우에는 다음 명령어를 입력해주세요

```
npm run test
```

Level의 달성량을 확인하기 위해 다음 명령어를 사용해주세요

```
npm run coverage
```

## Level 달성량 확인하기

`npm run coverage`를 실행하면 tutorial 디렉토리에 coverage 파일이 생성됩니다.
 
 이후 lcov-report 안의 index.html 파일을 브라우저에서 엽니다.

![01](./statics/readme01.png)


브라우저를 열면 Level 별로 할당량을 확인 하실 수 있습니다.

![02](./statics/readme02.png)

![03](./statics/readme03.png)

붉은 줄로 밑줄이 그여진 부분은 테스트가 되지 않는 영역입니다.

해당 영역을 테스트하여 `Statements`가 100%가 되게 하는 것이 우리의 목표입니다.
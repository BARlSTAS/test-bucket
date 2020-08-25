# Puppeteer 를 이용한 memory leak 자동 탐지

[해당 글](https://media-codings.com/articles/automatically-detect-memory-leaks-with-puppeteer)을 번역한 내용입니다.

## memory leak이란 무엇입니까?
일반적으로 memory leak 은 소프트웨어가 더이상 필요 없는 메모리를 붙잡고 있는 상황을 말합니다. 

자바스크립트에서는 어딘가 잊혀진 곳에 object 에 대한 참조가 있음을 의미합니다.

그리고 garbage collection 에게는 object가 사용되고 있는 것인지 아닌지를 구별하는게 불가능합니다.

여태까지 웹 개발자에게 memory leak 은 그렇게 걱정할 부분이 아니었습니다. 페이지안에 모든 링크들은 메모리상에 새 페이지를 불러오기 때문입니다. memory leak은 특정 프로그램에 아주 오랜 시간 구동 중일 때만 발생했기 때문이죠.

오늘날 SPA, PWA 와 함께 상황이 바뀌었습니다. 많은 웹사이트들은 앱처럼 되었고, Web Audio API 를 사용하는 앱들처럼 오랜 시간 구동을 위해 설계 되었습니다. 문제의 memory leak 은 크로스 브라우저 호환성을 위한 libarary 인 standardized-audio-context 에서 발견 되었습니다.

제 생각에 memory leak 에 대한 가장 간단한 예시는 object 에 metadata 들을 붙이는 것입니다. 

두개의 object 를 가지고 있고, 각각에 metadata를 저장하기를 원한다고 가정하겠습니다. 

이는 아래와 같이 Map을 이용해서 처리할 수 있습니다. Map은 metadata 들을 저장하고, 다시 꺼내쓰고 지우는게 가능합니다. object를 metadata의 index 키로 사용하는 Map이 있으면 됩니다.

```js
const map = new Map();
// store metadata
map.set(obj, metadata);
// get metadata
map.get(obj);
// delete metadata
map.delete(obj);
```

만약 obj 키를 지우고 남은 metadata 가 있는 object는 어떻게 될까요?

이는 여전히 garbage collect 되지 않습니다. 왜냐하면 Map이 metadata를 인덱스하기 위해서 참조하고 있기 때문입니다.
아래 예제는 좀 부자연스럽지만 많은 memory leak 을 간단히 감소 시킬 수 있습니다.

```js
const map = new Map();
setInterval(() => {
  const obj = { };
  map.set(obj, { any: 'metadata' });
}, 100);
```

생성된 object들은 모든 gabage collection 에서 생존 합니다. 왜냐하면 Map 이 그들을 참조하고 있기 때문입니다. 이는 WeakMap 에 대한 완벽한 use case 입니다. 

WeakMap 에 의한 참조는 object가 garbage collection 되는 것을 막지 않습니다.
```js
const map = new WeakMap();
    map.set(obj, { any: 'metadata' });
}, 100);
```

Map 을 WeakMap 으로 교체하는 것만으로도 memory leak 을 일으키는 원인은 없앨 수 있습니다. 제 코드에서 memory leak 을 일으키는 문제는 분명하지는 않지만 아주 비슷합니다.

## What is puppeteer?
Puppeteer는 크롬 또는 다른 Chromium 브라우저를 원격으로 제어하는데 사용할 수 있는 툴입니다. Selenium 와 WebDriver 의 단순한 대용이지만 Chromium기반의 브라우저에서만 동작한다는 단점이 있습니다. Selenium에서는 접근할 수 없는 API들을 사용하는데, 실제 유저처럼 웹사이트와 상호작용을 시도하기 때문입니다. Puppeteer는 일반 유저들이 접근하지 못하는 많은 API들도 접근합니다.이는 Chrome DevTools Protocol 의 유틸기능에 의해 동작합니다. Selenium 은 할 수 없지만 Puppeteer 가 할 수 있는 것들 중 하나가 inspection memory 입니다. 이는 memory leak을 찾으려 할 때, 매우 도움이 될 것입니다.

## Measuring the memory usage
page.metrics() 라는 메소드가 있는데, JSHeapUsedSize라는 metric 을 반환합니다. 이는 V8이 사용하는 메모리 byte 수치 입니다.
const { JSHeapUsedSize } = await page.metrics();
Triggering the garbage collection
아쉽지만 메모리 크기를 얻는 것만으로는 충분하지 않습니다. 자바스크립트 프로그램의 메모리는 아주 거대한 garbage collection 에 의해 관리 됩니다. garbage collection 은 아주 엄격하고, 잘 알려진 JS garbage collection 스케쥴에 따라 나타나지 않고, 적기라고 판단 될 때마다 동작합니다. 이는 Javascript code 안에서 트리거 할 수 없습니다. 그러나 메모리 관측 전에 trash 가 수거 되었는지, 메모리 소모가 코드상의 큰 변화에 따라 계산 되었는지를 실행 되었는지 확인이 필요합니다.


heap의 snapshot이 만들어질 때, garbage collection 은 암묵적으로 트리거 됩니다. 이는 아래 코드와 같이 제가 프로그래밍적으로 snapshot 을 만들려고 시도했던 이유입니다.
```js
const client = await page.target().createCDPSession();
await new Promise((resolve) => {
    const resolvePromise = ({ finished }) => {
        if (finished) {
            client.off(
                'HeapProfiler.reportHeapSnapshotProgress',
                resolvePromise
            );
            resolve();
        }
    };
    client.on(
        'HeapProfiler.reportHeapSnapshotProgress',
        resolvePromise
    );
    client.send(
        'HeapProfiler.takeHeapSnapshot',
        { reportProgress: true }
    );
});
```
이것은 동일하게 작동하지 않습니다. garbage collection 을 부르지만, 기대했던 일관성 있는 결과를 만들어 내진 않습니다.
약간 다르게 시도해봤습니다. Stack Overflow 의 답변들을 보면, Puppeteer 를 구동할 때, V8 flags를 명시할 수 있다고 합니다. flags 중 하나가 garbage collection 을 노출하는 것을 의미합니다.
```js
await puppeteer.launch({
    args: [ '--js-flags=--expose-gc' ]
});
```
자, 이러면 global window 객체에 붙어 있는 마법 같은 gc() 함수를 호출 할 수 있습니다.
```js
await page.evaluate(() => gc());
```
Puppeteer 의 내부 DevTools Protocol client 를 사용하는 것보다는 덜 핵스럽습니다만, 다시는 일관성 있는 결과를 얻을 수 없었습니다.

## Counting all the objects
왜 테스트 결과마다 다른 결과가 나오는지 궁금했습니다. 심지어 간단한 코드를 실행할 때, 테스트 케이스의 파라미터 하나를 바꿀 때도 메모리 사용이 다르게 나왔습니다.
시간이 지나고 나서, 코드를 실행한 수에 따라 메모리 사용이 다른거 같다고 여겼습니다. 저는 memory leak 이 없다는 것을 확실히 하기 위해 코드를 몇번에 걸쳐 실행했습니다. 저는 메모리 소비는 변함이 없을 것이라고 기대 했습니다. 다른 말로 표현하자면, 메모리 소비는 코드를 실행하기 전과 테스트 코드를 실행 완료 한 후에도 같아야 했습니다.
그러나 메모리 사용과 반복 횟수에는 관련이 있었습니다. 그러나 실제로 한 메모리 누수에서는 기대 했던 것처럼 선형 관계는 아니었습니다. 일부는 메모리가 증가했지만, 대부분에서는 안정적이었지만 누수도 있었습니다.

다행히도 Puppteer 는 이러한 문제들을 위해 간단하고 더 나은 방법을 제공합니다. 주어진 prototype과 함께 모든 objects 들을 query 하는 방식인 page.queryObjects() 입니다.
다음 함수에서 볼 수 있듯이 prototype과 prototype chain에서 같은 prototype을 갖는 모든 object 의 수를 갖습니다. 이 case 에서 Object.prototype을 사용 했습니다. 왜냐하면 JS에서 대부분의 것들은 Object.prototype으로부터 상속 되기 때문입니다. prototype 없이 생성되는 objects(by using Object.create(null))와 원시값에 대한 예외 사항은 눈여겨봐야합니다.
```js
const countObjects = async (page) => {
    const prototype = await page.evaluateHandle(() => {
        return Object.prototype;
    });
    const instances = await page.queryObjects(
        prototype
    );
    const numberOfObjects = await page.evaluate(
        (instances) => instances.length,
        handle
    );
    await prototype.dispose();
    await instances.dispose();
    return numberOfObjects;
};
```
이는 objects가 heap을 차지하는 바이트 수와는 무관합니다. 이는 단지 그 크기 자체만 계산하는데, JS 코드에서 메모리 누수를 테스트하기 위한 좋은 시작이 되었습니다.
마침내 일관성 있는 결과를 얻는 법을 찾았습니다. 이 방법의 가장 좋은 점은 objects를 세기 전에 gargabe collection을 트리거 하는 것입니다. 이렇게 되면 위에서 언급한 방법 중 하나를 사용하지 않아도 됩니다.

## Running the memory leak tests
Puppeteer 1.17 버전까지 버그가 있었는데, 고맙게도 Andrey Lushnikov님이 고쳐주셨습니다. 대단히 감사합니다! 이 때문에 countObjects() 함수가 예상대로 작동하지 않았습니다. 그러나 1.18 버전에서부터는 더이상 나타나지 않고 있습니다.
저는 개인적으로 테스트 용도로 Mocha 를 선호합니다. 다른 테스팅 라이브러리들과의 setup은 거의 비슷할 것입니다. 다른 테스팅 라이브러리들처럼 Mocha도 hooks (테스트 전 후에 트리거 됨)을 제공합니다. 이는 Puppeteer와 함께 브라우저를 띄우는데 사용되고 테스트가 완료 된 이후에 다시 종료시킵니다.

```js
describe('memory leak tests', () => {
    let browser;
    let context;
    let page;
    before(async () => {
        browser = await puppeteer.launch();
    });
    beforeEach(async () => {
        context = await browser
            .createIncognitoBrowserContext();
        page = await context.newPage();
    });
    it('should ...', () => {
        // The actual test will be executed here.
    });
    afterEach(() => context.close());
    after(() => browser.close());
});
```

위 코드는 테스트 시작전에 브라우저를 띄우고, 마지막 테스트 이후에 다시 종료 시킵니다. 추가적으로 매 개별 테스트 전에 페이지와 함께 새로운 context 를 만듭니다. 각각의 테스트가 끝나면 context 를 없애줍니다.
boilerplate 를 설치하면, countObjects() 함수를 사용해서 실제 메모리 누수를 테스트를 다음과 같이 할 수 있습니다.
```js
it('should not have a memory leak', async () => {
    const numberOfObjects = await countObjects(page);
    await page.evaluate(() => {
        // Do something a couple of times.
    });
    expect(await countObjects(page))
        .to.equal(numberOfObjects);
});
```
이제 우리는 자동화 된 방법으로 메모리 누수를 테스트하는 방법을 갖게 되었습니다.
만약 관심이 있다면 자유롭게 메모리 누수가 발생하지 않도록(the reported memory leak never) 표준화된 audio context library 에 대한 테스트 코드(memory leak tests)를 살펴보세요.

## debounce, throttle로 연속 입력 관리하기 (with react)

> **목차**
> 
> [1\. debounce란?](#1-debounce란)
> 
> [2\. throttle이란?](#2-throttle이란)
> 
> [3\. debounce, throttle 구현하기](#3-debounce-throttle-구현하기)

<br />
<hr />
<br />

### **1\. debounce란?**

-   연속 이벤트 발생시, 일정한 시간 동안 이벤트를 실행하지 않고, 마지막 이벤트 발생에만 핸들러를 호출
-   주로 텍스트 입력, 스크롤 이벤트(새로운 데이터 호출)에 적용
-   불필요한 처리 혹은 네트워크 요청 방지
-   ex) 사용자가 검색어를 입력할 때 검색 결과 업데이트

<br />
<hr />
<br />

### **2\. throttle이란?**

-   일정한 주기로 이벤트 핸들러를 호출
-   일정 시간 동안 이벤트가 연속 발생하더라도, 맨 처음 한번만 핸들러를 호출하고, 다음 주기에 다시 실행 가능해짐
-   스크롤 위치에 따라 이벤트를 발생할 경우 사용

<br />
<hr />
<br />

### **3\. debounce, throttle 구현하기**

-   debounce 함수 작성  
    \- setTimeout 조작을 위한 변수생성  
    \- delay 시간 안에 새로운 입력이 들어오면 기존에 있던 setTimeout 실행 취소  
    \- 새로운 setTimeout  등록

```
/utils/debounce.js

const debounce = (func, delay) => {
  // setTimeout 조작을 위한 변수 생성
  let timerId;

  return (...args) => {
    // delay 시간 안에 새로운 입력이 들어오면 기존에 있던 setTimeout 실행 취소
    clearTimeout(timerId);

    // 새로운 setTimeout 등록하기
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
```

<br />

-   throttle 함수 작성  
    \- setTimeout 조작을 위한 변수 생성  
    \- delay 시간 안에 새로운 입력이 들어오면 기존에 있던 setTimeout 실행 취소  
    \- 새로운 setTimeout 등록하기

```
/utils/throttle.js

const debounce = (func, delay) => {
  // setTimeout 조작을 위한 변수 생성
  let timerId;

  return (...args) => {
    // delay 시간 안에 새로운 입력이 들어오면 기존에 있던 setTimeout 실행 취소
    clearTimeout(timerId);

    // 새로운 setTimeout 등록하기
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
```

<br />

-   debounce, throttle 적용하기  
    \- 이벤트 핸들러 내부에서 debounce, throttle 사용 함수 정의하지 않도록 주의  
    \-  핸들러 내부에서 해당 함수를 정의할 경우, setTimeout 자체가 여러개 생겨 동작 오류가 남

```
import { useState } from "react";
import "./App.css";
import debounce from "./assets/utils/debounce";
import throttle from "./assets/utils/throttle";

function App() {
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");

  // debounce 적용
  const debounceSearch = debounce((value) => setSearch1(value), 1000);

  // throttle 적용
  const throttleSearch = throttle((value) => setSearch2(value), 1000);

  // parameter 넣어주기
  const handleDebounce = (e) => {
    debounceSearch(e.target.value);
  };

  // parameter 넣어주기
  const handleThrottle = (e) => {
    throttleSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="title">{`< debounce 적용시켰을 때 (1초) >`}</div>

      {/* input에 이벤트 적용 */}
      <input onChange={handleDebounce}></input>
      <div>{`현재 입력된 값은 ${search1} 입니다.`}</div>
      <hr />
      <div className="title">{`< throttle 적용시켰을 때 (1초) >`}</div>

      {/* input에 이벤트 적용 */}
      <input onChange={handleThrottle}></input>
      <div>{`현재 입력된 값은 ${search2} 입니다.`}</div>
      <div className="throttle"></div>
    </div>
  );
}

export default App;
```

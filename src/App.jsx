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

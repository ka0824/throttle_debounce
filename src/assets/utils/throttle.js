const throttle = (func, delay) => {
  // setTimeout 조작을 위한 변수 추가
  let timerId;

  return (...args) => {
    // delay 시간 안에 새로운 입력이 들어오지 않았을 경우에만 실행, delay 기간 내일 경우 입력 무시
    if (!timerId) {
      timerId = setTimeout(() => {
        func(...args);

        // delay 시간 이후에 setTimeout 변수 초기화 시켜서 재실행 가능하게끔 처리
        timerId = undefined;
      }, delay);
    }
  };
};

export default throttle;

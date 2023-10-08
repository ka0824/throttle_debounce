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

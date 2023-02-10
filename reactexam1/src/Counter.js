import React, { useState } from "react";

const Counter = () => {
  // 0에서 출발
  // 1씩 증가하고
  // 1씩 감소하는
  // count 상태

  console.log("호출!");

  const [count, setCount] = useState(0); //3. count값이 바뀌고

  const onIncrease = () => {
    setCount(count + 1); //2. setCount의 인자로 (기존 count 값에 +1 한 값) 전달
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  const [count2, setCount2] = useState(0); //3. count값이 바뀌고

  const onIncrease2 = () => {
    setCount2(count2 + 1); //2. setCount의 인자로 (기존 count 값에 +1 한 값) 전달
  };

  const onDecrease2 = () => {
    setCount2(count2 - 1);
  };

  return (
    <div>
      {/* 4. count값이 새롭게 바뀐다. */}
      <h2>{count}</h2>
      {/* 1. onClick을 누르면 onIncrease 실행 */}
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>

      {/* 4. count값이 새롭게 바뀐다. */}
      <h2>{count2}</h2>
      {/* 1. onClick을 누르면 onIncrease 실행 */}
      <button onClick={onIncrease2}>+</button>
      <button onClick={onDecrease2}>-</button>
    </div>
  );
};

export default Counter;

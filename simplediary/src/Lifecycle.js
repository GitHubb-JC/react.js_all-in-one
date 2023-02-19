import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    // 배열에 아무것도 없어서 mount시에 {}안에 콜백함수 실행
    console.log("Mount!");

    // 배열에 아무것도 넣지 않고 use를 사용할 때는
    // Unmount 시에 return 이 실행돼!
    return () => {
      console.log("Unmount!");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>On/Off</button>
      {/* 단락회로 평가를 이용할 수 있다. */}
      {/* 둘다 트루이면 화면에 나오고 */}
      {/* isVisible이 false면 화면에는 아무것도 보이지 않아 */}
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;

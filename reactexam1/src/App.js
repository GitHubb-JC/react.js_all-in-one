// import './App.css';

import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Counter from "./Counter";
import Container from "./Container";

function App() {
  const number = 5;
  //여러개를 이렇게 한번에 전달 할 수 있어
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  };

  return (
    <Container>
      {/* 여기 밑의 div 컴포넌트가 props로 전달 */}
      <div className="App">
        <MyHeader />
        {/* 스프레드 연산자 이용 */}
        <Counter {...counterProps} />
        <MyFooter />
      </div>
    </Container>
  );
}

export default App;

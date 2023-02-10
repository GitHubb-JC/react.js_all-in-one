// import './App.css';

import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import Counter from "./Counter";

function App() {
  const number = 5;

  return (
    <div className="App">
      <MyHeader />
      <Counter />
      <MyFooter />
    </div>
  );
}

export default App;

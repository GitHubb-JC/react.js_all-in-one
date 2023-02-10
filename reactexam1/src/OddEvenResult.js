const OddEvenResult = ({ count }) => {
  //받아온 프롭스를 이용한다.
  console.log(count);
  return <>{count % 2 === 0 ? "짝수" : "홀수"}</>;
};

export default OddEvenResult;

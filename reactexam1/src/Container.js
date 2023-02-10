const Container = ({ children }) => {
  return (
    <div style={{ margin: 20, padding: 20, border: "1px solid gray" }}>
      {/* 전달 받아온 props를 감싸는 container */}
      {children}
    </div>
  );
};

export default Container;

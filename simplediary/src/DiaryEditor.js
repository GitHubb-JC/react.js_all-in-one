import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  //useRef함수를 이용해 authorInput을 만들어줘
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //authorInput과 연결된 태그의 current값을 가져와서 focus해줘
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    // 프롭스로 전달 받은 함수를 사용하여 일기 생성
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    // 일기를 만들면 생성창은 다시 빈칸으로 바꿔줘야지
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      {/* 작가 부분 */}
      <div>
        <input
          //input의 ref를 authorInput과 연결
          ref={authorInput}
          name="author"
          value={state.author}
          //함수를 이용하여 더 간략하게 표현가능
          onChange={handleChangeState}
        ></input>
      </div>
      {/* 내용 부분 */}
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      {/* 감정점수 부분 */}
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      {/* 저장 버튼 */}
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;

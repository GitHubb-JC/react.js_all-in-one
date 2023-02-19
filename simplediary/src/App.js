import { useRef, useState, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

// https://jsonplaceholder.typicode.com/comments

function App() {
  //일기 데이터들은 빈 상태로 시작한다.
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기를 만들 함수
  const onCreate = (author, content, emotion) => {
    // 생성할 정보들을 받아 새로운 일기 생성
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    // id 값을 하나 올려주고
    dataId.current += 1;
    // 일기장 data 에 새로운 일기 newItem을 가장 위(앞)에 추가해준다.
    setData([newItem, ...data]);
  };

  // targetId를 전달 받아 onDelete실행
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    // targetId를 가진 일기를 제외하고 newDiaryList에 filter로 담아
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // 그렇게 새로운 List 를 setData 이용하여 일기장 List에 담아
    setData(newDiaryList);
  };

  // 수정할 글의 targetId 값과 새로운 내용의 newContent를 받아와
  const onEdit = (targetId, newContent) => {
    setData(
      // map함수로 data에 있는 값을 다 돌려봐줘
      data.map((it) =>
        // targetId와 일치하는 글이 있으면
        // 기존 내용은 ...it 으로 채워주고
        // content값을 newContent로 바꿔줘
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      {/* onCreate를 에디터의 프롭스로 전달 한다. */}
      <DiaryEditor onCreate={onCreate} />
      {/* List 에서 일기 data를 받아오고 함수들을 넘겨주어서 사용한다. */}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;

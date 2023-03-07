import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]); //일기 데이터들은 빈 상태로 시작한다.
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        // js 에서 수학 연산을 담당하는 내장 객체 Math 이용
        // Math.random() * 5 >> 0 ~ 4.xx 까지 랜덤 난수 생성
        // Math.floor() >> random이 정수가 아닌 소수점 숫자들을 가져
        // 소수점 아래를 떨구기 위해 사용
        // 결과적으로 아래 줄은 1 ~ 5 까지 숫자가 나온다
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []); // 빈 배열을 넣으면 마운트 시에 바로 콜백함수를 실행 한다.

  const onCreate = useCallback((author, content, emotion) => {
    // 새로운 일기를 만들 함수
    const created_date = new Date().getTime(); // 생성할 정보들을 받아 새로운 일기 생성
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };

    dataId.current += 1; // id 값을 하나 올려주고

    // 함수형 업데이트 활용
    // 함수를 실행하면 data를 받아와서
    // data 에 새로운 일기 newItem을 가장 위(앞)에 추가해준다.
    setData((data) => [newItem, ...data]);
  }, []);

  // targetId를 전달 받아 onDelete실행
  const onRemove = (targetId) => {
    // targetId를 가진 일기를 제외하고 newDiaryList에 filter로 담아
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // 그렇게 새로운 List 를 setData 이용하여 일기장 List에 담아
    setData(newDiaryList);
  };

  // 수정할 글의 targetId 값과 새로운 내용의 newContent를 받아와
  const onEdit = (targetId, newContent) => {
    setData(
      data.map(
        (
          it // map함수로 data에 있는 값을 다 돌려봐줘
        ) =>
          // targetId와 일치하는 글이 있으면
          // 기존 내용은 ...it 으로 채워주고
          // content값을 newContent로 바꿔줘
          it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  // useMemo를 사용하면 getDiaryAnalysis 이 변수는 더 이상 함수가 아니라 "값" 으로 취급해
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // [data.length]가 바뀔 때만 실행해

  // 따라서 여기서 getDiaryAnalysis() 를 getDiaryAnalysis 로 바꿔줘야해!!
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      {/* onCreate를 에디터의 프롭스로 전달 한다. */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length} 개</div>
      <div>기분 좋은 일기 개수 : {goodCount} 개</div>
      <div>기분 나쁜 일기 개수 : {badCount} 개</div>
      <div>기분 좋은 일기 비율 : {goodRatio} %</div>
      {/* List 에서 일기 data를 받아오고 함수들을 넘겨주어서 사용한다. */}
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;

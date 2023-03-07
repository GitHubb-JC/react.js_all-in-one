import React, { useEffect, useRef, useState } from "react";
const DiaryItem = ({
  onEdit,
  onRemove,
  author,
  content,
  created_date,
  emotion,
  id,
}) => {
  useEffect(() => {
    console.log(`${id}번 째 아이템 렌더!`);
  });

  const [isEdit, setIsEdit] = useState(false); // 현재 수정을 준비하는 상태인지 아닌지 boolean 값으로 판단 해주는 set 함수
  const toggleIsEdit = () => setIsEdit(!isEdit); // 현재 수정을 준비하는 상태인지 아닌지 boolean 값을 반전 시켜주는 함수

  const [localContent, setLocalContent] = useState(content); // 수정버튼을 눌러주면 기존의 content를 수정상태에서도 그대로 보여주기 위한 set
  const localContentInput = useRef(); // 수정창의 글을 가져오기 위한 ref

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정을 취소할 때 isEdit을 수정하고 이전의 content값을 다시 넣어줘
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  // 수정을 하는 함수
  const handleEdit = () => {
    // 문자열이 5자를 넘어가도록 판단해주고
    if (localContent.length < 5) {
      localContentInput.current.focus(); // 아닐시 focus해줘
      return;
    }
    // 수정버튼을 누르면 팝업으로 한번더 물어봐주고
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent); // 실제로 수정해줘 보내는 값은 수정할 글의 id 값, 그리고 수정창에서 입력된 content(=localContent)값
      toggleIsEdit(); // isEdit은 다시 false값으로
    }
  };

  return (
    <div className="DiaryItem">
      <div className="Info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {/* isEdit이 true냐 false에 따라서 수정창을 보이고 안보이고 */}
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {/* isEdit이 true냐 false에 따라서 수정버튼을 어떻게 보이게 할지 */}
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);

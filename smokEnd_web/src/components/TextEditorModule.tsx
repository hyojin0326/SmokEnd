import { styled } from "styled-components";

function TextEditorModule() {
  return (
    <>
      <div className="ql-formats">
        <button className="ql-image" title="사진 첨부" />
        <button className="ql-link" title="링크 첨부" />
      </div>
      <div className="ql-formats" title="문단모양">
        <select className="ql-size" defaultValue="medium">
          <option value="huge">제목1</option>
          <option value="large">제목2</option>
          <option value="medium">본문1</option>
          <option value="small">본문2</option>
        </select>
        <select className="ql-font" defaultValue="sans-serif" title="글꼴" />
      </div>

      <div className="ql-formats">
        <button className="ql-bold" title="굵게" />
        <button className="ql-italic" title="기울임꼴" />
        <button className="ql-underline" title="밑줄" />
        <button className="ql-strike" title="취소선" />
        <button className="ql-blockquote" title="인용" />
      </div>

      <div className="ql-formats">
        <button className="ql-list" value="ordered" title="순서 있는 리스트" />
        <button className="ql-list" value="bullet" title="순서 없는 리스트" />
        <button className="ql-indent" value="-1" title="왼쪽 간격 줄이기" />
        <button className="ql-indent" value="+1" title="오른쪽 간격 늘리기" />
      </div>
      <div className="ql-formats">
        <select className="ql-color" title="글자색" />
        <select className="ql-background" title="배경색" />
        <select className="ql-align" title="정렬" />
      </div>
      <div className="ql-formats">
        <button className="ql-clean" />
      </div>
      {/* <div className="ql-formats">
        <button className="ql-code-block" />
        <button className="ql-link" />
        <button className="ql-image" />
      </div> */}
    </>
  );
}

export default TextEditorModule;

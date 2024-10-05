import styles from "../styles/SmokeTextById.module.css";
import dompurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { styled } from "styled-components";

interface board {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

function SmokeTextById() {
  const [boardData, setBoardData] = useState<board>();
  const [searchParams] = useSearchParams();
  var id = searchParams.get("id");
  console.log(id);

  const sanitizer = dompurify.sanitize;
  useEffect(() => {
    fetchData();
  }, []);
  //id를 기반으로 db값 가져오기
  const fetchData = async () => {
    const response = await fetch(
      `http://${import.meta.env.VITE_URL_API}/api/get/article/id/${id}`
    );
    if (response.status == 200) {
      const data: board = await response.json();
      setBoardData(data);
      // const content = sanitizer(data.content);
    } else {
      // 작성된 글 없음
      console.log("데이터 없음");
    }
  };

  const formats: string[] = [
    "image",
    "link",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
    "clean",
  ];
  const quillRef = useRef<ReactQuill | null>(null);
  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
      },
    }),
    []
  );

  const QuillView = styled.div`
    #toolBar {
      border-color: rgb(179, 96, 96);
      font-size: 1vw;
      display: none;
    }
    #quillContent .ql-container {
      border: none; /* Quill 에디터 전체의 테두리 제거 */
    }

    #quillContent .ql-editor {
      border: none; /* 에디터 텍스트 영역의 테두리 제거 */
      font-size: 1.2vw;
    }

    #quillContent .ql-editor.ql-blank::before {
      border: none; /* placeholder 부분의 테두리 제거 */
    }
    margin-bottom: 15vw;
  `;

  return (
    <>
      <div className={styles.content}>
        <div className={styles.title}>{boardData?.title}</div>
        <QuillView>
          <div id="toolBar" className={styles.toolBar}></div>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            modules={modules}
            formats={formats}
            id="quillContent"
            value={boardData?.content}
            className={styles.description}
          />
        </QuillView>
      </div>
    </>
  );
}
export default SmokeTextById;

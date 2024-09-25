import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEditorModule from "./TextEditorModule";
import { styled } from "styled-components";
import styles from "../styles/TextEditor.module.css";
import { Link } from "react-router-dom";

type categoryProps = {
  categoryName: string;
  name: string;
};

// type FormData = {
//   category: string;
//   title: string;
//   content: string;
// };

const TextEditor = ({ categoryName, name }: categoryProps) => {
  // const [content, setContent] = useState<string>("");
  // const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>(
    categoryName == "risk" ? "흡연의 위험성" : "금연의 필요성"
  );
  const quillRef = useRef<ReactQuill | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
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
  const handleChange = (content: string) => {};
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    // console.log(selectedCategory);
    setCategory(selectedCategory);
  };
  const changeImageHandler = (): void => {
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpg,image/png,image/jpeg");
    input.setAttribute("multiple", "multiple");
    input.click();

    input.onchange = async (): Promise<void> => {
      if (quillRef.current) {
        // onChange 추가
        let file: FileList | null = input.files;
        const editor: any = quillRef.current.getEditor();
        const range: any = editor.getSelection();

        if (file !== null) {
          const reader = new FileReader();
          for (let i: number = 0; i < file.length; i++) {
            reader.readAsDataURL(file[0]);

            reader.onloadend = () => {
              editor.insertEmbed(range.index, "image", reader.result);
              editor.setSelection(range.index + 1);
            };
          }
        }
      }
    };
  };

  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
        handlers: {
          image: changeImageHandler,
        },
      },
    }),
    []
  );

  const buttonClick = () => {
    var title, content;
    if (titleRef.current) {
      title = titleRef.current.value;
    }
    if (quillRef.current) {
      content = quillRef.current.value;
    }
    console.log("카테고리 : " + category);
    console.log("제목 : " + title);
    console.log("내용 : " + content);
  };

  const CustomQuillEditorView = styled.div`
    #toolBar {
      border-color: rgb(255, 255, 255);
      font-size: 1vw;
    }
    #quillContent .ql-container {
      border: none; /* Quill 에디터 전체의 테두리 제거 */
      border-top: 0.1vw solid #ededed;
    }

    #quillContent .ql-editor {
      border: none; /* 에디터 텍스트 영역의 테두리 제거 */
    }

    #quillContent .ql-editor.ql-blank::before {
      border: none; /* placeholder 부분의 테두리 제거 */
    }
  `;

  return (
    <>
      <CustomQuillEditorView>
        <div className={styles.header}>
          <div className={styles.headerLogo}>
            <Link to="/">
              <span className={styles.header_logo_black}>Smok</span>
              <span className={styles.header_logo_red}>E</span>
              <span className={styles.header_logo_black}>nd</span>
            </Link>
          </div>
          <div id="toolBar" className={styles.toolBar}>
            <TextEditorModule />
          </div>
          <div className={styles.headerName}>관리자 {name}님</div>
        </div>
        <div className={styles.content}>
          <select
            name="category"
            value={category}
            className={
              category === "카테고리"
                ? styles.selectOptionDefault
                : styles.selectOption
            }
            onChange={handleSelectChange}
          >
            <option value="흡연의 위험성">흡연의 위험성</option>
            <option value="금연의 필요성">금연의 필요성</option>
          </select>

          <br />
          <input
            type="text"
            className={styles.inputTitle}
            placeholder="제목을 입력하세요"
            ref={titleRef}
          />
          <ReactQuill
            theme="snow"
            ref={quillRef}
            modules={modules}
            formats={formats}
            id="quillContent"
            onChange={handleChange}
          />
        </div>
        <div className={styles.bottom}>
          <button className={styles.button} onClick={buttonClick}>
            완료
          </button>
        </div>
      </CustomQuillEditorView>
    </>
  );
};

export default TextEditor;

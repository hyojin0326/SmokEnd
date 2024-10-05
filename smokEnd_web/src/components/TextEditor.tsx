import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import quillStyle from "react-quill/dist/quill.snow.css";
import TextEditorModule from "./TextEditorModule";
import { styled } from "styled-components";
import styles from "../styles/TextEditor.module.css";
import { Link } from "react-router-dom";
import dompurify from "dompurify";
import { v4 as uuidv4 } from "uuid";

type categoryProps = {
  categoryName: string;
  name: string;
};

interface FormData_edit {
  sessionId: string;
  category: string;
  title: string;
  content: string;
}

const TextEditor = ({ categoryName, name }: categoryProps) => {
  // const [content, setContent] = useState<string>("");
  // const [title, setTitle] = useState<string>("");
  const [formData, setFormData] = useState<FormData_edit>({
    sessionId: "",
    category: "",
    title: "",
    content: "",
  });
  const sanitizer = dompurify.sanitize;
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

  const uniqueString = uuidv4();

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
          console.log(uniqueString);
          for (let i = 0; i < file.length; i++) {
            const formData = new FormData();
            formData.append("image", file[i]); // 서버로 전송할 이미지 파일 추가
            formData.append("sessionId", uniqueString); // 필요 시 sessionId 추가

            try {
              // 서버로 이미지 파일 전송
              const response = await fetch(
                `http://${import.meta.env.VITE_URL_API}/api/handle/uploadImg`,
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (response.status === 200) {
                const publicUrl = await response.text(); // 서버에서 받은 이미지 URL
                console.log(publicUrl);
                editor.insertEmbed(range.index, "image", publicUrl); // Quill 에디터에 이미지 삽입
                editor.setSelection(range.index + 1); // 커서를 이미지 다음으로 이동
              } else {
                console.error("이미지 업로드 실패:", await response.text());
              }
            } catch (error) {
              console.error("이미지 업로드 중 에러:", error);
            }
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

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const buttonClick = async () => {
    var category_ = category == "금연의 필요성" ? "necessity" : "risk";
    var title, content;
    if (titleRef.current) {
      title = titleRef.current.value;
      if (title == "") {
        alert("제목을 입력해주세요");
        return;
      }
    }

    if (quillRef.current) {
      // content = quillRef.current.value;
      const quillInstance = quillRef.current.getEditor(); // Quill 인스턴스 가져오기
      content = quillInstance.root.innerHTML; // HTML 형식으로 내용 가져오기
      if (content === "<p><br></p>") {
        alert("내용을 입력해주세요");
        return;
      }
    }
    const updatedFormData = {
      sessionId: uniqueString,
      category: category_,
      title: title!,
      content: content!,
    };
    try {
      console.log(updatedFormData);
      //서버로 아티클 전송
      const response = await fetch(
        `http://${import.meta.env.VITE_URL_API}/api/handle/uploadArticle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 헤더 추가
          },
          body: JSON.stringify({
            sessionId: uniqueString,
            category: category_,
            title: title!,
            content: content!,
          }),
        }
      );
      if (response.status === 200) {
        window.location.href = `/smokeText/${category_}`;
      } else {
        console.log("글작성 실패");
      }
    } catch (error) {
      console.error("글 작성 실패임:", error);
    }
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
      font-size: 1.2vw;
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
            disabled
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
          {/* <ReactQuill
            theme="snow"
            value={test}
            // dangerouslySetInnerHTML={{ __html: sanitizer(test) }}
          /> */}
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

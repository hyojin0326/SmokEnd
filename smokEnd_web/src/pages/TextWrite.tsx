import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import TextEditorModule from "../components/TextEditorModule";
import ReactQuill from "react-quill";

function TextWrite() {
  const { category } = useParams<{ category: string }>();
  const [name, setName] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const user = document.cookie.replace(
      /(?:(?:^|.*;\s*)userStats\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (user != "") {
      const userStats = JSON.parse(user);
      setName(userStats.name);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      alert("글 작성은 웹에서만 가능합니다.");
      window.location.href = "/SmokeText/" + category;
    }
  }, [isMobile]);

  return <TextEditor categoryName={category!} name={name!} />;
}

export default TextWrite;

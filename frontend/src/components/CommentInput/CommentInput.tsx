import React, { useState } from "react";
import axios from "axios";
import "./CommentInput.css";

interface CommentInputProps {
  articleId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async () => {
    try {
      await axios.post(`/article/${articleId}/comments`, { content });
      alert("댓글이 등록되었습니다.");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="comment-input">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요."
      />
      <button onClick={handleSubmit}>댓글 등록하기</button>
    </div>
  );
};

export default CommentInput;
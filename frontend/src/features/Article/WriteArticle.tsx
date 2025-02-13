import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { createArticle } from "../../store/actions/articleActions";
import "./WriteArticle.css";

const categories = [
  { id: 1, name: "JOB_REVIEW", label: "합격 후기" },
  { id: 2, name: "QUESTION_REVIEW", label: "답변 첨삭" },
  { id: 3, name: "INFO_SHARING", label: "정보 공유" },
  { id: 4, name: "ETC", label: "기타" },
];

const MAX_FILE_SIZE_MB = 5; // 최대 파일 크기 (MB)
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"]; // 허용된 확장자

const WriteArticle: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const dispatch = useAppDispatch();

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ category?: string; title?: string; content?: string; images?: string }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newErrors: string[] = [];

      // 이미지 파일 검증
      const validFiles = selectedFiles.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
          newErrors.push(`허용되지 않는 확장자입니다: ${file.name}`);
          return false;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          newErrors.push(`파일 크기가 너무 큽니다 (최대 ${MAX_FILE_SIZE_MB}MB): ${file.name}`);
          return false;
        }
        return true;
      });

      setImages(validFiles);
      if (newErrors.length > 0) {
        setErrors((prev) => ({ ...prev, images: newErrors.join("\n") }));
      } else {
        setErrors((prev) => ({ ...prev, images: undefined }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: { category?: string; title?: string; content?: string } = {};
    if (!categoryId) newErrors.category = "카테고리가 입력되지 않았습니다.";
    if (!title.trim()) newErrors.title = "제목이 입력되지 않았습니다.";
    if (!content.trim()) newErrors.content = "내용이 입력되지 않았습니다.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("category_id", String(categoryId));
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));

    dispatch(createArticle(formData));
    alert("게시글이 성공적으로 등록되었습니다!");
    onCancel();
  };

  // Quill toolbar options
  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <div className="write-article">
      {/* 상단 헤더 */}
      <div className="detail-header">
        <button className="back-button" onClick={onCancel}>
          목록
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 카테고리 */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            카테고리<span className="required">*</span>
          </label>
          <select
            id="category"
            value={categoryId || ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            className={`form-select ${errors.category ? "error-border" : ""}`}
          >
            <option value="" disabled>
              카테고리를 선택해주세요
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        {/* 제목 */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목<span className="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`form-input ${errors.title ? "error-border" : ""}`}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* 내용 */}
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            내용<span className="required">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해주세요"
            modules={quillModules}
            className="quill-editor"
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        {/* 이미지 첨부 */}
        <div className="form-group image-upload">
          <label htmlFor="images" className="form-label">
            이미지 첨부
          </label>
          <div className="form-group image-input">
            <input
                id="images"
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                multiple
                onChange={handleImageChange}
            />
            {/* 설명 추가 */}
            <small className="image-description">
                * 허용된 확장자: jpg, jpeg, png, gif / 파일 최대 크기: {MAX_FILE_SIZE_MB}MB
            </small>
            {errors.images && <span className="error-message">{errors.images}</span>}
          </div>
        </div>

        {/* 버튼 */}
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            취소
          </button>
          <button type="submit" className="submit-button">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteArticle;

import { useState } from "react";

function UpLoadPage() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile || !category || !title) {
      alert("画像とカテゴリとタイトルを選択してください");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("category", category);
    formData.append("title", title);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("アップロード成功");
        setSelectedFile(undefined);
        setCategory("");
      } else {
        alert("アップロード失敗");
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>画像アップロード</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">カテゴリを選択</option>
        <option value="nature">自然</option>
        <option value="sports">スポーツ</option>
      </select>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files?.[0])}
      />
      {selectedFile && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="プレビュー"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
      )}
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "アップロード中..." : "アップロード"}
      </button>
    </div>
  );
}

export default UpLoadPage;

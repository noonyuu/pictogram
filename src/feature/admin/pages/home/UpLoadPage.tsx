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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

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
    <div className="flex items-center justify-center grow">
      <div className="mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          画像アップロード
        </h2>
        <div className="space-y-6">
          {/* カテゴリ選択 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              カテゴリ
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">カテゴリを選択</option>
              <option value="nature">自然</option>
              <option value="sports">スポーツ</option>
            </select>
          </div>
          {/* タイトル入力 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              タイトル
            </label>
            <input
              type="text"
              placeholder="タイトルを入力してください"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* ファイル選択エリア */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              画像ファイル
            </label>
            <div className="flex w-full items-center justify-center">
              <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="mb-3 h-8 w-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-1 text-sm text-gray-500">
                    クリックして画像を選択
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF (MAX. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0])}
                />
              </label>
            </div>
          </div>
          {/* 画像プレビュー */}
          {selectedFile && (
            <div className="mt-4 flex justify-center">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="プレビュー"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-3">
                  <span className="truncate text-sm font-medium text-white">
                    {selectedFile.name}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* アップロードボタン */}
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full rounded-lg py-3 font-medium text-white transition-all ${
              isUploading
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                アップロード中...
              </div>
            ) : (
              "アップロード"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpLoadPage;

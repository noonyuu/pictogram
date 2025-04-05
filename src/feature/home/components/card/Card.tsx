import error from "@/assets/image/error.webp";
import { Typography, Modal, Button } from "antd";
import { useState } from "react";

const { Text } = Typography;

type CardProps = {
  title: string | undefined;
  image: string | undefined;
};

const Card = ({ title, image }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageUrl = image
    ? `${import.meta.env.VITE_BACKEND_URL}/get?date=${encodeURIComponent(image)}`
    : error;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = title || "downloaded_image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-40 cursor-pointer">
      <div className="size-40 flex items-center justify-center" onClick={() => setIsModalOpen(true)}>
        <img src={imageUrl} alt="" sizes="160" loading="lazy" />
      </div>
      <div className="text-center">
        <Text>{title ? title : "読み込みエラー"}</Text>
      </div>
      <Modal
        title="画像プレビュー"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <img src={imageUrl} alt="プレビュー" className="w-full" />
        <div className="mt-4 text-center">
          <Button type="primary" onClick={handleDownload}>
            ダウンロード
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Card;

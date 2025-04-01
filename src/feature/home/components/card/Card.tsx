import error from "@/assets/image/error.webp";
import { Typography } from "antd";

const { Text } = Typography;

// const { Text } = Typography;

type CardProps = {
  title: string | undefined;
  image: string | undefined;
};

const Card = ({ title, image }: CardProps) => {
  return (
    <div className="w-40">
      <div className="border-gray size-40 border">
        <img src={image ? image : error} alt="" sizes="160" loading="lazy" />
      </div>
      <div className="text-center">
        <Text>{title ? title : "読み込みエラー"}</Text>
      </div>
    </div>
  );
};

export default Card;

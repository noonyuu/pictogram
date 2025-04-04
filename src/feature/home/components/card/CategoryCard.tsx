import error from "@/assets/image/error.webp";
import { ReactNode } from "react";

type CategoryCardProps = {
  title: string;
  icon: ReactNode;
  nun: number;
  onClick: () => void;
  isSelected?: boolean;
};

const CategoryCard = ({
  title,
  icon,
  nun,
  onClick,
  isSelected,
}: CategoryCardProps) => {
  return (
    <div
      className={`border-gray h-29 w-65 cursor-pointer rounded-2xl border transition-colors ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex w-2/5 items-center justify-center rounded-full">
          {typeof icon === "string" ? (
            <img
              src={icon ? icon : error}
              alt={title ? title + "のアイコン" : "読み込みエラー"}
              loading="lazy"
              className="size-18 rounded-full"
            />
          ) : (
            <div className="flex size-18 items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        <div className="w-3/5 text-left">
          <div className="text-base">{title}</div>
          <div className="text-base">{nun}&nbsp;枚</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;

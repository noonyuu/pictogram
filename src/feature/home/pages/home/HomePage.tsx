import { useEffect, useState, useRef } from "react";
import {
  AppstoreOutlined,
  CarOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

import Card from "@/feature/home/components/card/Card";
import Tag from "@/feature/home/components/tag/Tag";
import CategoryCard from "@/feature/home/components/card/CategoryCard";

type HomePageProps = {
  selectedCategoryKey: string;
  onCategorySelect: (key: string) => void;
};

// 画像データの型
type ImageItem = {
  id: number;
  title: string;
  category: string;
  image: string;
};

// アイコンとタイトルのマッピング
const ICON_MAP: Record<string, React.ReactNode> = {
  all: <AppstoreOutlined />,
  交通: <CarOutlined />,
  sports: <CoffeeOutlined />,
  施設: <CoffeeOutlined />,
  nature: <CoffeeOutlined />,
};

const TITLE_MAP: Record<string, string> = {
  all: "すべて",
  交通: "交通",
  sports: "スポーツ",
  施設: "施設",
  nature: "自然",
};

const HomePage = ({ selectedCategoryKey, onCategorySelect }: HomePageProps) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [categories, setCategories] = useState<
    { key: string; title: string; icon: React.ReactNode; count: number }[]
  >([]);

  // カテゴリごとの画像キャッシュ
  const imageCache = useRef<Record<string, ImageItem[]>>({});

  // 初回にカテゴリ件数を取得
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category-count`)
      .then((res) => res.json())
      .then((data) => {
        const fetched = data.categories as {
          category: string;
          count: number;
        }[];

        const mapped = [
          {
            key: "all",
            title: "すべて",
            icon: ICON_MAP["all"],
            count: fetched.reduce((acc, cur) => acc + cur.count, 0),
          },
          ...fetched.map((cat) => ({
            key: cat.category,
            title: TITLE_MAP[cat.category] ?? cat.category,
            icon: ICON_MAP[cat.category] ?? <CoffeeOutlined />,
            count: cat.count,
          })),
        ];
        setCategories(mapped);
      })
      .catch((err) => console.error("Error fetching category counts:", err));
  }, []);

  // カテゴリが切り替わったときの画像取得
  useEffect(() => {
    const key = selectedCategoryKey;

    // キャッシュがあればそれを使う
    if (imageCache.current[key]) {
      setImages(imageCache.current[key]);
      return;
    }

    // APIから画像取得してキャッシュ
    const queryParam = `?category=${encodeURIComponent(key)}`;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/list${queryParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.images) {
          imageCache.current[key] = data.images;
          setImages(data.images);
        }
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, [selectedCategoryKey]);

  return (
    <div className="pt-6">
      <Tag category={TITLE_MAP[selectedCategoryKey] ?? selectedCategoryKey} />
      <div className="flex pt-6">
        <div className="grow">
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {images.map((pictogram) => (
              <Card
                key={pictogram.id}
                title={pictogram.title}
                image={pictogram.image}
              />
            ))}
          </div>
        </div>

        <div className="hidden h-full flex-col gap-y-6 md:mx-6 lg:flex">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              title={cat.title}
              icon={cat.icon}
              nun={cat.count}
              onClick={() => onCategorySelect(cat.key)}
              isSelected={cat.key === selectedCategoryKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import { useMemo } from "react";
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

const HomePage = ({ selectedCategoryKey, onCategorySelect }: HomePageProps) => {
  const categories = [
    { key: "すべて", title: "すべて", icon: <AppstoreOutlined />, count: 12 },
    { key: "交通", title: "交通", icon: <CarOutlined />, count: 3 },
    { key: "スポーツ", title: "スポーツ", icon: <CoffeeOutlined />, count: 3 },
    { key: "施設", title: "施設", icon: <CoffeeOutlined />, count: 3 },
    { key: "自然", title: "自然", icon: <CoffeeOutlined />, count: 3 },
  ];

  const pictograms = useMemo(
    () => [
      {
        id: 1,
        title: "自動車",
        category: "交通",
        image: "car",
      },
      {
        id: 2,
        title: "自転車",
        category: "交通",
        image: "bicycle",
      },
      {
        id: 3,
        title: "電車",
        category: "交通",
        image: "train",
      },
      {
        id: 4,
        title: "サッカー",
        category: "スポーツ",
        image: "soccer",
      },
      {
        id: 5,
        title: "野球",
        category: "スポーツ",
        image: "baseball",
      },
      {
        id: 6,
        title: "水泳",
        category: "スポーツ",
        image: "swimming",
      },
      {
        id: 7,
        title: "トイレ",
        category: "施設",
        image: "toilet",
      },
      {
        id: 8,
        title: "レストラン",
        category: "施設",
        image: "restaurant",
      },
      {
        id: 9,
        title: "病院",
        category: "施設",
        image: "hospital",
      },
      {
        id: 10,
        title: "山",
        category: "自然",
        image: "mountain",
      },
      { id: 11, title: "木", category: "自然", image: "tree" },
      { id: 12, title: "川", category: "自然", image: "river" },
    ],
    [],
  );

  const filterPictograms = useMemo(() => {
    if (selectedCategoryKey === "すべて") {
      return pictograms;
    }
    return pictograms.filter((p) => p.category === selectedCategoryKey);
  }, [pictograms, selectedCategoryKey]);

  return (
    <>
      <div className="pt-6">
        <Tag category={selectedCategoryKey} />
        <div className="flex pt-6">
          <div className="grow">
            <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {filterPictograms.map((pictogram) => (
                <Card
                  key={pictogram.id}
                  title={pictogram.title}
                  image={pictogram.image}
                />
              ))}
            </div>
          </div>
          <div className="hidden h-full flex-col gap-y-6 md:mx-6 lg:flex">
            {categories.map((category) => (
              <CategoryCard
                key={category.key}
                title={category.title}
                icon={category.icon}
                nun={category.count}
                onClick={() => onCategorySelect(category.key)}
                isSelected={category.key === selectedCategoryKey}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

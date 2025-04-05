import { useState, useCallback } from "react";
import {
  AppstoreOutlined,
  CarOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import AppRoutes from "@/router";
import Header from "@/component/header";

type MenuItem = Required<MenuProps>["items"][number];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // headerのメニューが開いているかどうか
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("all"); // 選択されているカテゴリ

  // TODO: menuItems(カテゴリ)をAPIから取得
  const menuItems: MenuItem[] = [
    { key: "all", icon: <AppstoreOutlined />, label: "すべて" },
    { key: "交通", icon: <CarOutlined />, label: "交通" },
    { key: "sports", icon: <CoffeeOutlined />, label: "スポーツ" },
    { key: "施設", icon: <CoffeeOutlined />, label: "施設" },
    { key: "nature", icon: <CoffeeOutlined />, label: "自然" },
  ];

  // カテゴリを選択した時の処理
  const handleCategorySelect = useCallback((key: string) => {
    setSelectedCategoryKey(key);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        onCategorySelect={handleCategorySelect}
      />
      <AppRoutes
        selectedCategoryKey={selectedCategoryKey}
        onCategorySelect={handleCategorySelect}
      />
    </>
  );
}

export default App;

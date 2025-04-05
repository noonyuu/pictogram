import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  CarOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

import { HomePage } from "@/feature/home/pages";
import { UpLoadPage, AdminHomePage } from "@/feature/admin/pages";
import NotFound from "@/component/notfound";
import { AuthProvider } from "@/feature/admin/components/AuthProvider";
import RequireAuth from "@/feature/admin/components/RequireAuth";
import Header from "@/component/header";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/feature/admin/hook/useAuth";

const routes = [
  {
    path: "/",
    Component: HomePage,
    isProtected: false,
  },
  {
    path: "/admin/home",
    Component: AdminHomePage,
    isProtected: false,
  },
  {
    path: "/admin/upload",
    Component: UpLoadPage,
    isProtected: true,
  },
  {
    path: "*",
    Component: NotFound,
    isProtected: false,
  },
];

type MenuItem = Required<MenuProps>["items"][number];

const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("all");
  const { setIsAdmin } = useAuth();

  const menuItems: MenuItem[] = [
    { key: "all", icon: <AppstoreOutlined />, label: "すべて" },
    { key: "交通", icon: <CarOutlined />, label: "交通" },
    { key: "sports", icon: <CoffeeOutlined />, label: "スポーツ" },
    { key: "施設", icon: <CoffeeOutlined />, label: "施設" },
    { key: "nature", icon: <CoffeeOutlined />, label: "自然" },
  ];

  const handleCategorySelect = useCallback((key: string) => {
    setSelectedCategoryKey(key);
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    // 現在のパスが/adminで始まるかどうかをチェック
    const isAdminRoute = location.pathname.startsWith("/admin");

    // not found判定
    const isKnownRoute = routes.some((route) => {
      if (route.path === "*") return false;
      return (
        location.pathname === route.path ||
        (route.path.includes("*") &&
          location.pathname.startsWith(route.path.replace("*", "")))
      );
    });
    // not found時はtrue
    const isNotFoundRoute = !isKnownRoute;
    setIsAdmin(isAdminRoute || isNotFoundRoute);
  }, [location.pathname, setIsAdmin]);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        onCategorySelect={handleCategorySelect}
      />

      <Routes>
        {routes.map(({ path, Component, isProtected }, i) => {
          const element = (
            <Component
              selectedCategoryKey={selectedCategoryKey}
              onCategorySelect={handleCategorySelect}
            />
          );
          return (
            <Route
              key={i}
              path={path}
              element={
                isProtected ? <RequireAuth>{element}</RequireAuth> : element
              }
            />
          );
        })}
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;

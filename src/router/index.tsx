import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "@/feature/home/pages";
import { UpLoadPage, AdminHomePage } from "@/feature/admin/pages";
import NotFound from "@/component/notfound";
import { AuthProvider } from "@/feature/admin/components/AuthProvider";
import RequireAuth from "@/feature/admin/components/RequireAuth";

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
  // ] as const satisfies RouteProps[];
];

const AppRoutes = ({
  selectedCategoryKey, // 選択されているカテゴリ
  onCategorySelect, // カテゴリを選択した時の処理(カテゴリーのステートを更新してる)
}: {
  selectedCategoryKey: string;
  onCategorySelect: (key: string) => void;
}) => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, Component, isProtected }, i) => {
            const element = (
              <Component
                selectedCategoryKey={selectedCategoryKey} // 選択されているカテゴリ
                onCategorySelect={onCategorySelect}
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
      </BrowserRouter>
    </AuthProvider>
  );
};
export default AppRoutes;

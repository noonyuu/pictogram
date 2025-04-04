import { HomePage } from "@/feature/home/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const routes = [
  {
    path: "/",
    Component: HomePage,
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
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route
            key={i}
            path={path}
            element={
              <Component
                selectedCategoryKey={selectedCategoryKey} // 選択されているカテゴリ
                onCategorySelect={onCategorySelect}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;

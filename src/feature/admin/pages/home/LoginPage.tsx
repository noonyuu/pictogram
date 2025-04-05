import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (id: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // バリデーション
      if (id === "" || password === "") {
        setError("IDとパスワードを入力してください");
        return;
      }

      // ログインAPIを呼び出す
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        },
      );

      if (!response.ok) {
        throw new Error("ログインに失敗しました");
      }
      // ログイン成功時の処理
      const data = await response.json();
      console.log(data);
      if (data.message == "error") {
        setError("ログインに失敗しました");
      } else if (data.message == "success") {
        localStorage.setItem("token", password);
        login();
        navigate("/admin/home");
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (data.message == "error") {
        return;
      }
      login();
      navigate("/admin/home");
    };
    checkAuth();
  }, [login, navigate]);

  return (
    <div className="flex grow items-center justify-center bg-gray-100">
      <LoginForm handleLogin={handleLogin} error={error} />
      {isLoading && (
        <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black">
          読み込み中...
        </div>
      )}
    </div>
  );
};

export default LoginPage;

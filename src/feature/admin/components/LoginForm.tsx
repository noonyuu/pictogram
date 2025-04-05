import { FormEvent, useState } from "react";

type LoginFormProps = {
  handleLogin: (id: string, password: string) => void;
  error: string | null;
};

const LoginForm = ({ handleLogin, error }: LoginFormProps) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin(id, password);
  };

  return (
    <div className="h-112 w-96 rounded-lg bg-white shadow-lg">
      <div className="flex h-full flex-col items-center justify-center gap-y-6 p-8">
        <div className="grow text-2xl font-bold">ログイン</div>
        <div className="flex w-full grow-0 flex-col gap-y-2">
          <label htmlFor="id">ユーザーID</label>
          <input
            type="text"
            id="id"
            className="border-gray text-md w-full rounded-md border px-3 py-2 shadow-md"
            placeholder="ユーザーIDを入力"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="flex w-full grow-0 flex-col gap-y-2">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            className="border-gray text-md w-full rounded-md border px-3 py-2 shadow-md"
            placeholder="パスワードを入力"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
            className={`${error ? "text-main visible rounded bg-red-100 p-2" : "invisible"} flex w-full grow items-center justify-center`}
        >
          {error}
        </div>

        <div className="w-full grow">
          <button
            className="border-gray text-md w-full cursor-pointer rounded-md border bg-blue-500 px-3 py-2 text-lg text-white shadow-md hover:bg-blue-600"
            type="submit"
            onClick={onSubmit}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

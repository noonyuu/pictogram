import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex grow items-center justify-center bg-gray-100">
      <button onClick={() => navigate("/admin/upload")}>投稿</button>
    </div>
  );
};

export default HomePage;

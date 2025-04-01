import { Typography } from "antd";

const { Title } = Typography;

const Header = () => {
  return (
    <header className="border-gray text-main flex h-18 items-center border-b">
      <Title className="font-pop! m-0! mb-2!">ピクトグラム</Title>
    </header>
  );
};

export default Header;

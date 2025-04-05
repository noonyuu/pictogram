import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const { Title } = Typography;

type HeaderProps = {
  isMenuOpen: boolean; // headerのメニューが開いているかどうか
  setIsMenuOpen: (open: boolean) => void; // headerのメニューの切り替え
  menuItems: MenuItem[]; // メニューの項目
  onCategorySelect: (key: string) => void; // カテゴリを選択した時の処理(カテゴリーのステートを更新してる)
};

const Header = ({
  isMenuOpen,
  setIsMenuOpen,
  menuItems,
  onCategorySelect,
}: HeaderProps) => {
  // headerのメニューの切り替え
  const handleOpenChange = (open: boolean) => {
    setIsMenuOpen(open);
  };

  // カテゴリを選択した時の処理
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onCategorySelect(e.key);
  };

  return (
    <header className="border-gray text-main sticky top-0 flex h-18 items-center border-b bg-white">
      <div className="ml-2 grow">
        <Title className="font-pop! m-0! mb-2!">ピクトグラム</Title>
      </div>
      <div className="lg:hidden">
        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          trigger={["click"]}
          onOpenChange={handleOpenChange}
          open={isMenuOpen}
        >
          <button className="mr-4 align-middle text-2xl leading-none">
            {isMenuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { RocketOutlined, HistoryOutlined, DatabaseOutlined } from "@ant-design/icons";

const { Header } = Layout;

const menuItems = [
  { key: "1", label: <Link to="/">Home</Link> },
  {
    key: "spacecraft",
    label: "Spacecraft",
    icon: <RocketOutlined />,
    children: [
      { key: "2", label: <Link to="/spaceship">Spaceship</Link> },
      { key: "8", label: <Link to="/rockets">Rockets</Link> },
      { key: "9", label: <Link to="/dragons">Dragons</Link> },
      { key: "4", label: <Link to="/capsules">Capsules</Link> },
    ],
  },
  {
    key: "operations",
    label: "Operations",
    icon: <DatabaseOutlined />,
    children: [
      { key: "3", label: <Link to="/launches">Launches</Link> },
      { key: "5", label: <Link to="/cores">Cores</Link> },
      { key: "6", label: <Link to="/payloads">Payloads</Link> },
      { key: "11", label: <Link to="/landpads">Landing Pads</Link> },
    ],
  },
  {
    key: "info",
    label: "Information",
    icon: <HistoryOutlined />,
    children: [
      { key: "7", label: <Link to="/missions">Missions</Link> },
      { key: "10", label: <Link to="/history">History</Link> },
    ],
  },
];

const AppHeader = () => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        triggerSubMenuAction="hover"
        popupClassName="full-width-submenu"
      />
    </Header>
  );
};

export default AppHeader;

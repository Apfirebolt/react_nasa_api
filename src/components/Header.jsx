import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const menuItems = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/spaceship">Spaceship</Link> },
    { key: '3', label: <Link to="/mission">Mission</Link> },
    { key: '4', label: <Link to="/capsules">Capsules</Link> },
    { key: '5', label: <Link to="/cores">Cores</Link> },
    { key: '6', label: <Link to="/payloads">Payloads</Link> },
    { key: '7', label: <Link to="/missions">Missions</Link> },
];

const AppHeader = () => {
    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
        </Header>
    );
};

export default AppHeader;
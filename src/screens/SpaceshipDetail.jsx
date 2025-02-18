import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const SpaceshipDetail = ({ spaceship }) => {
    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Spaceships</Breadcrumb.Item>
                <Breadcrumb.Item>{spaceship.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="site-layout-content"
                style={{ background: "#fff", padding: 24, minHeight: 280 }}
            >
                <h1>{spaceship.name}</h1>
                <p>{spaceship.description}</p>
                {/* Add more spaceship details here */}
            </div>
        </Content>
    );
};

export default SpaceshipDetail;

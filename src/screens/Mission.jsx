import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const Missions = () => {
    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Missions</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="site-layout-content"
                style={{ background: "#fff", padding: 24, minHeight: 280 }}
            >
                Welcome to the NASA API Missions Page
            </div>
        </Content>
    );
};

export default Missions;

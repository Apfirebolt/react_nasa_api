import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const MissionDetail = ({ mission }) => {
    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Missions</Breadcrumb.Item>
                <Breadcrumb.Item>{mission.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="site-layout-content"
                style={{ background: "#fff", padding: 24, minHeight: 280 }}
            >
                <h1>{mission.name}</h1>
                <p>{mission.description}</p>
                {/* Add more mission details here */}
            </div>
        </Content>
    );
};

export default MissionDetail;

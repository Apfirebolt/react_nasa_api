import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const SpaceshipDetail = ({ spaceship }) => {
    const breadcrumbItems = [
        { title: 'Home' },
        { title: 'Spaceships' },
        { title: spaceship.name }
    ];

    return (
        <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
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

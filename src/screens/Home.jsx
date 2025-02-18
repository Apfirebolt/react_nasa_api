import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const Home = () => {
  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{ background: "#fff", padding: 24, minHeight: 280 }}
      >
        Welcome to the NASA API Home Page
      </div>
    </Content>
  );
};

export default Home;

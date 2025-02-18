import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const Home = () => {
  const breadcrumbItems = [
    {
      title: "Home",
    },
  ];

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
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

import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";

const Missions = () => {
  const breadcrumbItems = [{ title: "Home" }, { title: "Missions" }];

  return (
    <Content style={{ padding: "0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumbItems} />
      <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
        Welcome to the NASA API Missions Page
      </div>
    </Content>
  );
};

export default Missions;

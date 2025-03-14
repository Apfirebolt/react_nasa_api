import userBearStore from "../zustStore";
import { Row, Button } from "antd";

const BearStore = () => {
    const bears = userBearStore((state) => state.bears);
    const increasePopulation = userBearStore((state) => state.increasePopulation);
    const removeAllBears = userBearStore((state) => state.removeAllBears);

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Bear Store</h1>
      <Row gutter={[16, 16]}>
        {bears}
      </Row>
        <Row gutter={[16, 16]}>
            <Button onClick={increasePopulation}>Add Bear</Button>
            <Button onClick={removeAllBears}>Remove All Bears</Button>
        </Row>
    </div>
  );
};

export default BearStore;

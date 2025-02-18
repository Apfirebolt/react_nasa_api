import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getCoreData } from "../features/core/coreSlice";
import Loader from "../components/Loader";

const Core = () => {
  const { coreList, isLoading } = useSelector((state) => state.coreData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoreData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Cores</h1>
      <Row gutter={[16, 16]}>
        {coreList.map((core) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={core.core_serial}
            style={{ marginBottom: "16px" }}
          >
            <Card title={core.core_serial}>
              <p>
                Details: {core.details ? core.details : "No details available"}
              </p>
              <p>Status: {core.status}</p>
              <p>Type: {core.type}</p>
              <p>Original Launch: {core.original_launch}</p>
              <p>Missions: {core.missions.length}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Core;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getCapsuleData } from "../features/capsule/capsuleSlice";
import Loader from "../components/Loader";

const Capsule = () => {
  const { capsuleList, isLoading } = useSelector((state) => state.capsuleData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCapsuleData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Capsules</h1>
      <Row gutter={[16, 16]}>
        {capsuleList.map((capsule) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={capsule.capsule_serial}
            style={{ marginBottom: "16px" }}
          >
            <Card title={capsule.capsule_serial}>
              <p>
                Details:{" "}
                {capsule.details ? capsule.details : "No details available"}
              </p>
              <p>Status: {capsule.status}</p>
              <p>Type: {capsule.type}</p>
              <p>Original Launch: {capsule.original_launch}</p>
              <p>Missions: {capsule.missions.length}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Capsule;

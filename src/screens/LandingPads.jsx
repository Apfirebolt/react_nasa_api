import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getLandingPadData } from "../features/landing/landingPadSlice";
import Loader from "../components/Loader";

const LandingPads = () => {
  const { landingPadList, isLoading } = useSelector(
    (state) => state.landingPadData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLandingPadData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Landing Pads</h1>
      <Row gutter={[16, 16]}>
        {landingPadList.map((pad) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            key={pad.id}
            style={{ marginBottom: "16px" }}
          >
            <Card title={pad.full_name}>
              <p>
                Details: {pad.details ? pad.details : "No details available"}
              </p>
              <p>Status: {pad.status}</p>
              <p>
                Location: {pad.location.name}, {pad.location.region}
              </p>
              <p>Landing Attempts: {pad.landing_attempts}</p>
              <p>Landing Successes: {pad.landing_successes}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LandingPads;

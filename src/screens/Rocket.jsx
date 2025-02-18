import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getRocketData } from "../features/rocket/rocketSlice";
import Loader from "../components/Loader";

const Rockets = () => {
  const { rocketList, isLoading } = useSelector((state) => state.rocketData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRocketData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Rockets</h1>
      <Row gutter={[16, 16]}>
        {rocketList.map((rocket) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={rocket.rocket_id}
            style={{ marginBottom: "16px" }}
          >
            <Card title={rocket.rocket_name}>
              <p>
                Description:{" "}
                {rocket.description
                  ? rocket.description
                  : "No description available"}
              </p>
              <p>Type: {rocket.rocket_type}</p>
              <p>First Flight: {rocket.first_flight}</p>
              <p>Country: {rocket.country}</p>
              <p>Company: {rocket.company}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Rockets;

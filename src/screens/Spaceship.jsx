import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getShipData } from "../features/ship/shipSlice";
import Loader from "../components/Loader";

const Spaceships = () => {
  const { shipList, isLoading } = useSelector((state) => state.shipData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShipData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Spaceships</h1>
      <Row gutter={[16, 16]}>
        {shipList.map((spaceship) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={spaceship.ship_id}
            style={{ marginBottom: "16px" }}
          >
            <Card title={spaceship.spaceship_name}>
              <p>
                Name:{" "}
                {spaceship.ship_name
                  ? spaceship.ship_name
                  : "No name available"}
              </p>
              <p>
                Home Port:{" "}
                {spaceship.home_port
                  ? spaceship.home_port
                  : "No home port available"}
              </p>
              <p>Weight (in KG): {spaceship.weight_kg ? spaceship.weight_kg : "No weight available"}</p>
              <p>Year Built: {spaceship.year_built ? spaceship.year_built : "No year built available"}</p>
              {spaceship.image ? (
                <img
                  src={spaceship.image}
                  alt={spaceship.ship_name}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Spaceships;

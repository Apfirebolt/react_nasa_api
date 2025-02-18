import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getDragonData } from "../features/dragon/dragonSlice";
import Loader from "../components/Loader";

const Dragons = () => {
  const { dragonList, isLoading } = useSelector((state) => state.dragonData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDragonData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Dragons</h1>
      <Row gutter={[16, 16]}>
        {dragonList.map((dragon) => (
          <Col
            xs={24}
            sm={12}
            key={dragon.id}
            style={{ marginBottom: "16px" }}
          >
            <Card title={dragon.name}>
              <p>
                Description:{" "}
                {dragon.description
                  ? dragon.description
                  : "No description available"}
              </p>
              <p>Type: {dragon.type}</p>
              <p>First Flight: {dragon.first_flight}</p>
              <p>Crew Capacity: {dragon.crew_capacity}</p>
              <p>Heat Shield Material: {dragon.heat_shield.material}</p>
              <p>Thruster Type: {dragon.thrusters[0].type}</p>
              <p>Launch Payload Mass: {dragon.launch_payload_mass.kg} kg</p>
              <p>Return Payload Mass: {dragon.return_payload_mass.kg} kg</p>
              <p>Height with Trunk: {dragon.height_w_trunk.meters} meters</p>
              <p>Diameter: {dragon.diameter.meters} meters</p>
              <p>
                <a
                  href={dragon.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dragons;

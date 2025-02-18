import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getMissionData } from "../features/mission/missionSlice";
import Loader from "../components/Loader";

const Missions = () => {
  const { missionList, isLoading } = useSelector((state) => state.missionData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMissionData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Missions</h1>
      <Row gutter={[16, 16]}>
        {missionList.map((mission) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={mission.mission_id}
            style={{ marginBottom: "16px" }}
          >
            <Card title={mission.mission_name}>
              <p>
                Details: {mission.details ? mission.details : "No details available"}
              </p>
              <p>Type: {mission.mission_type}</p>
              <p>Orbit: {mission.orbit}</p>
              <p>Nationality: {mission.nationality}</p>
              <p>Manufacturer: {mission.manufacturer}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Missions;

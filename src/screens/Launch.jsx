import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getLaunchData } from "../features/launch/launchSlice";
import Loader from "../components/Loader";

const Launch = () => {
  const { launchList, isLoading } = useSelector((state) => state.launchData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLaunchData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Launches</h1>
      <Row gutter={[16, 16]}>
        {launchList.map((launch, index) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={index}
            style={{ marginBottom: "16px" }}
          >
            <Card title={launch.mission_name}>
              <p>
                Details:{" "}
                {launch.details ? launch.details : "No details available"}
              </p>
              <p>Launch Year: {launch.launch_year}</p>
              <p>Launch Date: {launch.launch_date_utc}</p>
              <p>Rocket: {launch.rocket.rocket_name}</p>
              <p>Launch Site: {launch.launch_site.site_name}</p>
              <p>
                Links:{" "}
                <a
                  href={launch.links.article_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Article
                </a>{" "}
                |{" "}
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>{" "}
                |{" "}
                <a
                  href={launch.links.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Video
                </a>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Launch;

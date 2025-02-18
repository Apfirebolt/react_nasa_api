import { useEffect, useState } from "react";
import axiosInstance from "../plugins/interceptor";
import { Card, Typography, List } from "antd";
import Loader from "../components/Loader";

const Home = () => {
  const [roadsterDetails, setRoadsterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Title, Paragraph } = Typography;

  useEffect(() => {
    const fetchRoadsterDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("roadster");
        setRoadsterDetails(response.data);
      } catch (error) {
        console.error("Error fetching roadster details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadsterDetails();
  }, []);

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Space X API App</h1>
      <p>
        Welcome to the SpaceX API app. This app is built using React, Redux,
        Redux-toolkit and Ant Design. The app fetches data from the SpaceX API
        and displays it in a user-friendly way.
      </p>

      {loading ? (
        <Loader />
      ) : (
        roadsterDetails && (
          <Card title="Elon Musk's Tesla Roadster">
            <Title level={4}>Launch Date (UTC):</Title>
            <Paragraph>{roadsterDetails.launch_date_utc}</Paragraph>
            <Title level={4}>Launch Mass (kg):</Title>
            <Paragraph>{roadsterDetails.launch_mass_kg}</Paragraph>
            <Title level={4}>Orbit Type:</Title>
            <Paragraph>{roadsterDetails.orbit_type}</Paragraph>
            <Title level={4}>Speed (km/h):</Title>
            <Paragraph>{roadsterDetails.speed_kph}</Paragraph>
            <Title level={4}>Earth Distance (km):</Title>
            <Paragraph>{roadsterDetails.earth_distance_km}</Paragraph>
            <Title level={4}>Mars Distance (km):</Title>
            <Paragraph>{roadsterDetails.mars_distance_km}</Paragraph>
            <Title level={4}>Details:</Title>
            <Paragraph>{roadsterDetails.details}</Paragraph>
            <Title level={4}>Wikipedia:</Title>
            <Paragraph>
              <a
                href={roadsterDetails.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
              >
                {roadsterDetails.wikipedia}
              </a>
            </Paragraph>
            <Title level={4}>Video:</Title>
            <Paragraph>
              <a
                href={roadsterDetails.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                {roadsterDetails.video}
              </a>
            </Paragraph>
            <Title level={4}>Images:</Title>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={roadsterDetails.flickr_images}
              renderItem={(item) => (
                <List.Item>
                  <img src={item} alt="Roadster" style={{ width: "100%" }} />
                </List.Item>
              )}
            />
          </Card>
        )
      )}
    </div>
  );
};

export default Home;

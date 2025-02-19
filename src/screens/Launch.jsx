import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { getLaunchData } from "../features/launch/launchSlice";
import LaunchCard from "../components/LaunchCard";
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
            <LaunchCard launch={launch} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Launch;

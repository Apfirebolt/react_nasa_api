import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Modal, Button, Tooltip } from "antd";
import { getCoreData } from "../features/core/coreSlice";
import Loader from "../components/Loader";

const Core = () => {
  const { coreList, isLoading } = useSelector((state) => state.coreData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCore, setSelectedCore] = useState(null);
  const showModal = (core) => {
    setIsModalOpen(true);
    setSelectedCore(core);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const showFormattedDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate
  }

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
              <p>Original Launch: {showFormattedDate(core.original_launch)}</p>
              <p>Missions: {core.missions.length}</p>
              <Tooltip title="See Core Info">
                <Button type="primary" onClick={() => showModal(core)}>
                  Info
                </Button>
              </Tooltip>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Core Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedCore && (
          <div>
            <h2>{selectedCore.core_serial}</h2>
            <p>
              Details:{" "}
              {selectedCore.details
                ? selectedCore.details
                : "No details available"}
            </p>
            <p>Status: {selectedCore.status}</p>
            <p>Original Launch: {showFormattedDate(selectedCore.original_launch)}</p>
            <h3>Missions:</h3>
            <ul>
              {selectedCore.missions.map((mission, index) => (
                <li key={index}>{mission.name}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Core;

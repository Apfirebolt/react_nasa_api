import { useEffect, useState, useRef } from "react";
import axiosInstance from "../plugins/interceptor";
// import userBearStore from "../zustStore";
import { Card, Typography, List, Drawer, Space, Button, Modal, Steps, Tour } from "antd";
import Loader from "../components/Loader";

const Home = () => {
  const [roadsterDetails, setRoadsterDetails] = useState(null);
  const [info, setInfo] = useState(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const { Title, Paragraph } = Typography;
  // const bears = userBearStore((state) => state.bears);

  const infoButtonRef = useRef(null);
  const stepperButtonRef = useRef(null);
  const cardRef = useRef(null);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setModalOpen(true);
    setStep(0);
  };

  const handleModalOk = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setModalOpen(false);
      setStep(0);
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    setStep(0);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const steps = [
    {
      title: 'Step 1',
      content: (
        <div>
          <Title level={4}>Welcome</Title>
          <Paragraph>This is the first step of the process.</Paragraph>
        </div>
      ),
    },
    {
      title: 'Step 2',
      content: (
        <div>
          <Title level={4}>Configuration</Title>
          <Paragraph>This is the second step where you configure settings.</Paragraph>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <div>
          <Title level={4}>Complete</Title>
          <Paragraph>This is the final step. Click finish to complete.</Paragraph>
        </div>
      ),
    },
  ];

  const tourSteps = [
    {
      title: 'SpaceX Info',
      description: 'Click here to view detailed information about SpaceX.',
      target: () => infoButtonRef.current,
    },
    {
      title: 'Stepper Modal',
      description: 'Click here to open a multi-step process modal.',
      target: () => stepperButtonRef.current,
    },
    {
      title: 'Roadster Details',
      description: 'View details about Elon Musk\'s Tesla Roadster in space.',
      target: () => cardRef.current,
    },
  ];

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

    const fetchInfo = async () => {
      try {
        const response = await axiosInstance.get("info");
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    }
    fetchInfo();
    fetchRoadsterDetails();
  }, []);

  return (
    <div style={{ padding: "16px", margin: "16px" }}>
      <h1>Space X API App</h1>
      <Drawer
        title="SpaceX Info"
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {info && (
          <div>
            <Title level={4}>Name:</Title>
            <Paragraph>{info.name}</Paragraph>
            <Title level={4}>Founder:</Title>
            <Paragraph>{info.founder}</Paragraph>
            <Title level={4}>Founded:</Title>
            <Paragraph>{info.founded}</Paragraph>
            <Title level={4}>Employees:</Title>
            <Paragraph>{info.employees}</Paragraph>
            <Title level={4}>Vehicles:</Title>
            <Paragraph>{info.vehicles}</Paragraph>
            <Title level={4}>Launch Sites:</Title>
            <Paragraph>{info.launch_sites}</Paragraph>
            <Title level={4}>Test Sites:</Title>
            <Paragraph>{info.test_sites}</Paragraph>
            <Title level={4}>CEO:</Title>
            <Paragraph>{info.ceo}</Paragraph>
            <Title level={4}>CTO:</Title>
            <Paragraph>{info.cto}</Paragraph>
            <Title level={4}>COO:</Title>
            <Paragraph>{info.coo}</Paragraph>
            <Title level={4}>CTO Propulsion:</Title>
            <Paragraph>{info.cto_propulsion}</Paragraph>
            <Title level={4}>Valuation:</Title>
            <Paragraph>{info.valuation}</Paragraph>
          </div>
        )}
        <Button type="primary" onClick={onClose}>
          Close
        </Button>
      </Drawer>
      <Space>
        <Button type="primary" ref={infoButtonRef} onClick={() => showDrawer()}>
          Show Info
        </Button>
        <Button type="default" ref={stepperButtonRef} onClick={showModal}>
          Open Stepper
        </Button>
        <Button type="dashed" onClick={() => setTourOpen(true)}>
          Start Tour
        </Button>
      </Space>

      <Tour open={tourOpen} onClose={() => setTourOpen(false)} steps={tourSteps} />

      <Modal
        title="Multi-Step Process"
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handlePrevious} disabled={step === 0}>
            Previous
          </Button>,
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {step === 2 ? 'Finish' : 'Next'}
          </Button>,
        ]}
      >
        <Steps current={step} items={steps.map(item => ({ title: item.title }))} style={{ marginBottom: 24 }} />
        <div>{steps[step].content}</div>
      </Modal>

      <p>
        Welcome to the SpaceX API app. This app is built using React, Redux,
        Redux-toolkit and Ant Design. The app fetches data from the SpaceX API
        and displays it in a user-friendly way.
      </p>

      {loading ? (
        <Loader />
      ) : (
        roadsterDetails && (
          <Card ref={cardRef} title="Elon Musk's Tesla Roadster">
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

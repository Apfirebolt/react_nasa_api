import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getPayloadData } from "../features/payload/payloadSlice";
import Loader from "../components/Loader";

const Payloads = () => {
    const { payloadList, isLoading } = useSelector((state) => state.payloadData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPayloadData());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div style={{ padding: "16px", margin: "16px" }}>
            <h1>Payloads</h1>
            <Row gutter={[16, 16]}>
                {payloadList.map((payload) => (
                    <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        key={payload.payload_id}
                        style={{ marginBottom: "16px" }}
                    >
                        <Card title={payload.payload_id}>
                            <p>
                                Details: {payload.details ? payload.details : "No details available"}
                            </p>
                            <p>Type: {payload.payload_type}</p>
                            <p>Orbit: {payload.orbit}</p>
                            <p>Nationality: {payload.nationality}</p>
                            <p>Manufacturer: {payload.manufacturer}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Payloads;

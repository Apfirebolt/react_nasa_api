import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card } from "antd";
import { getHistoryData } from "../features/history/historySlice";
import Loader from "../components/Loader";

const History = () => {
    const { historyList, isLoading } = useSelector((state) => state.historyData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHistoryData());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div style={{ padding: "16px", margin: "16px" }}>
            <h1>History</h1>
            <Row gutter={[16, 16]}>
                {historyList.map((event) => (
                    <Col
                        xs={24}
                        sm={12}
                        key={event.id}
                        style={{ marginBottom: "16px" }}
                    >
                        <Card title={event.title}>
                            <p>
                                Event Date:{" "}
                                {event.event_date_utc
                                    ? new Date(event.event_date_utc).toLocaleDateString()
                                    : "No date available"}
                            </p>
                            <p>Details: {event.details}</p>
                            <p>
                                <a
                                    href={event.links.article}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read more
                                </a>
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default History;

import axiosInstance from "../../plugins/interceptor";

// Get history data
const getHistory = async () => {
    try {
        const response = await axiosInstance.get("history");
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const historyService = {
    getHistory,
};

export default historyService;

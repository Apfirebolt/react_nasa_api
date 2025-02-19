import axiosInstance from "../../plugins/interceptor";

// Get launch data
const getLaunch = async () => {
    try {
        const response = await axiosInstance.get("launches");
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const launchService = {
    getLaunch,
};

export default launchService;

import axiosInstance from "../../plugins/interceptor";

// Get mission data
const getMissions = async () => {
  try {
    const response = await axiosInstance.get("missions");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const missionService = {
  getMissions,
};

export default missionService;

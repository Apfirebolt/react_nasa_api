import axiosInstance from "../../plugins/interceptor";

// Get core data
const getCore = async () => {
  try {
    const response = await axiosInstance.get("cores");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const coreService = {
  getCore,
};

export default coreService;

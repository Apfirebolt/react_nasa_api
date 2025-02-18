import axiosInstance from "../../plugins/interceptor";

// Get dragon data
const getDragons = async () => {
  try {
    const response = await axiosInstance.get("dragons");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const dragonService = {
  getDragons,
};

export default dragonService;

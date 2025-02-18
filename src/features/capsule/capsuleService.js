import axiosInstance from "../../plugins/interceptor";

// Get capsule data
const getCapsule = async () => {
  try {
    const response = await axiosInstance.get("capsules");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const capsuleService = {
  getCapsule,
};

export default capsuleService;

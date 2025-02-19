import axiosInstance from "../../plugins/interceptor";

// Get landing pad data
const getLandingPads = async () => {
    try {
        const response = await axiosInstance.get("landpads");
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

const landingPadService = {
    getLandingPads,
};

export default landingPadService;

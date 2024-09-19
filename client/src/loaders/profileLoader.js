import axios from "axios";

export async function profileLoader() {
  try {
    const profileResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/profile`,
      { withCredentials: true }
    );
    const profileData = profileResponse.data.data;
    return { success: true, profileData };
  } catch (error) {
    if (error.response?.status === 401) {
      return { success: false, errorCode: 'UNAUTHORIZED' }; // specific code for 401
    } else {
      console.error(error);
      return { success: false, errorCode: 'GENERAL_ERROR' }; // general error code
    }
  }
}

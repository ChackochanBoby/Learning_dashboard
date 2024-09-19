import axios from "axios";

export async function profileLoader() {
    const profileResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/profile`,{ withCredentials: true })
    const profileData = profileResponse.data.data
    return { profileData }
}
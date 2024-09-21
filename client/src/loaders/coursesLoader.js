import axios from "axios";

export async function coursesLoader() {
    const courseResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/course-list`,
        { withCredentials: true })
    const allCourses = courseResponse.data.data
    console.log(allCourses)
    return {allCourses}
}
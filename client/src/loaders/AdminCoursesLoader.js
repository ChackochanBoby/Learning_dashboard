import axios from "axios";

export async function AdminCoursesLoader({ request }) {
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || "all"; 

    const courseResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/admin/course-list`, {
        params: { status }, 
        withCredentials: true
    });

    const allCourses = courseResponse.data.data;
    return { allCourses };
}

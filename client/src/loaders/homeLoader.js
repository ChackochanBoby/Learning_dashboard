import axios from "axios";

export async function homeLoader() {
  const managedCoursesPromise = axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/instructor/managedcourses`,
    { withCredentials: true }
  ).catch(error => ({ data: { data: [] }, error }));

  const enrolledCoursesPromise = axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/learner/enrolled`,
    { withCredentials: true }
  ).catch(error => ({ data: { data: [] }, error }));

  try {
    const [instructorCourseResponse, enrolledCourseResponse] = await Promise.all([managedCoursesPromise, enrolledCoursesPromise]);

    if (instructorCourseResponse.error || enrolledCourseResponse.error) {
      console.error("Error fetching data:", instructorCourseResponse.error || enrolledCourseResponse.error);
    }

    const managedCourseData = instructorCourseResponse.data.data;
    const enrolledCoursesData = enrolledCourseResponse.data.data;

    // console.log(...managedCourseData, "this is managed courses");
    // console.log(...enrolledCoursesData, "this is enrolled courses");

    return { managedCourses: managedCourseData, enrolledCourses: enrolledCoursesData };
  } catch (error) {
    console.error("Error handling promises:", error);
    throw new Response("Data could not be loaded", { status: 500 });
  }
}

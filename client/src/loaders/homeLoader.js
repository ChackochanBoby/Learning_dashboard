// src/loaders/homePageLoader.js
import axios from "axios";

export async function homeLoader() {
  try {
    // Fetch data from multiple APIs concurrently
    const [instructorCourseResponse, enrolledCourseResponse] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/learner/enrolled`, { withCredentials: true }),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/instructor/managedcourses`, { withCredentials: true })
    ]);

    // Extract data from responses
    const managedCourseData = instructorCourseResponse.data.data;
    const enrolledCoursesData = enrolledCourseResponse.data.data;
    console.log( ...managedCourseData,"this is managed courses")
    console.log( ...enrolledCoursesData,"this is enrolled courses")
    // Combine the data into a single object
    return (
      {managedCourses:managedCourseData,enrolledCourses:enrolledCoursesData})
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Data could not be loaded", { status: 500 });
  }
}

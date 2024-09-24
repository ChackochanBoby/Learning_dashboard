import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModuleAccordion from "../components/ModuleAccordion";

function SingleCoursePage() {
  const { courseId } = useParams(); // Correctly get courseId from useParams
  const [course, setCourse] = useState(null); // Initialize course state
  const [isEnrolled, setIsEnrolled] = useState(false); // Initialize enrollment state
  const [userLoading,setUserLoading] = useState(true)
  const user = useSelector((state) => state.loginReducer.user); // Get user ID from Redux store
  const id=user?.id
  useEffect(() => {
    if (!id) {
      setUserLoading(true)
      return
    }
    setUserLoading(false)

    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`, { withCredentials: true });
        const courseData = response.data.data;
        setCourse(courseData);
        console.log(courseData)

        // If the user is not the instructor, check if they are enrolled
        if (id !== courseData.instructor) {
          const enrollmentResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/learner/check-enrollment/${courseId}`, { withCredentials: true });
          const enrolled = enrollmentResponse.data.isEnrolled;
            setIsEnrolled(enrolled);
        }
      } catch (error) {
        console.error("Error fetching course or enrollment data:", error);
      }
    };

    fetchCourse(); // Call the function to fetch data
  }, [courseId, id]); // Dependency array ensures it runs only when courseId or userId changes

  // If course data hasn't loaded yet
  if (!course||userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto xl:container p-4 w-screen">
  <h1 className="text-5xl text-light-primary-text dark:text-dark-primary-text capitalize text-center">
    {course.title}
  </h1>
  <p className="mx-auto max-w-screen-md text-light-secondary-text dark:text-dark-secondary-text text-center mt-12">
    {course.description}
      </p>
      {
        id==course.instructor||isEnrolled?(<section id="lessons" className="p-4">
          <h2 className="text-3xl text-light-primary-text dark:text-dark-primary-text text-center my-4">Modules</h2>
          <div>
            {course.modules.map(module=>{return <ModuleAccordion key={module._id} module={module} instructorId={course.instructor}/> })}
          </div>
        </section>) : (
          <section id="enroll" className="mt-8 mx-auto max-w-screen-md p-4 border border-light-border dark:border-dark-border rounded-lg text-center">
      <h2 className="text-2xl text-light-primary-text dark:text-dark-primary-text">Enroll in the course</h2>
      <p className="text-light-secondary-text dark:text-dark-secondary-text my-4">
        You need to enroll in this course to access the course materials.
      </p>
      <button
        
        className="bg-accent text-white py-2 px-6 rounded hover:bg-accent-dark transition duration-300"
      >
        Enroll Now
      </button>
    </section>)
      }
</main>

  );
}

export default SingleCoursePage;

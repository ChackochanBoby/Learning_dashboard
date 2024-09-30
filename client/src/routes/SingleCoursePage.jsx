import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModuleAccordion from "../components/ModuleAccordion";
import Modal from "../components/Modal";
import AddModuleForm from "../components/AddModuleForm";
import PublishCourseButton from "../components/PublishCourseButton";
import EditCourseForm from "../components/EditCourseForm";
import {loadStripe} from "@stripe/stripe-js"

function SingleCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null); 
  const [isEnrolled, setIsEnrolled] = useState(false); 
  const [userLoading, setUserLoading] = useState(true);
  const user = useSelector((state) => state.loginReducer.user); 
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const [isEditCourseModalOpen, setEditCourseModalOpen] = useState(false);
  
  const handleAddModuleClick = () => {
    setFormModalOpen(true);
  };
  const handleFormModalClose = () => {
    setFormModalOpen(false);
  };

  const handleEditCourseClick = () => {
    setEditCourseModalOpen(true);
  };
  const handleEditCourseModalClose = () => {
    setEditCourseModalOpen(false);
  };

  const id = user?.id;
  useEffect(() => {
    if (!id) {
      setUserLoading(true);
      return;
    }
    setUserLoading(false);

    // Fetch course details
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
          { withCredentials: true }
        );
        const courseData = response.data.data;
        setCourse(courseData);

        if (!courseData.isPublished && id !== courseData.instructor) {
          setIsAuthorized(false); // Set unauthorized state
          return;
        }
        
        const hasModules = courseData.modules.length > 0;
        const hasLessons = courseData.modules.some(
          (module) => module.lessons && module.lessons.length > 0
        );
  
        // Enable the button only if both conditions are met
        setDisabled(!(hasModules && hasLessons));

        // If the user is not the instructor, check if they are enrolled
        if (id !== courseData.instructor) {
          const enrollmentResponse = await axios.get(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/v1/learner/check-enrollment/${courseId}`,
            { withCredentials: true }
          );
          const enrolled = enrollmentResponse.data.isEnrolled;
          setIsEnrolled(enrolled);
        }
      } catch (error) {
        console.error("Error fetching course or enrollment data:", error);
      }
    };

    fetchCourse(); // Call the function to fetch data
  }, [courseId, id]); // Dependency array ensures it runs only when courseId or userId changes


  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

    const product = {
      image: course.image,
      title: course.title,
      price: course.price,
      id:course._id
    }
    
    const session = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/payment/create-payment-session`, product, { withCredentials: true })
      const result = stripe.redirectToCheckout({ sessionId: session.data.sessionId })
    } catch (error) {
      console.log(error)
    }
}

  if (!isAuthorized) {
    return (
      <div className="mx-auto xl:container pt-4 pb-8 w-screen text-center">
        <h1 className="text-4xl text-light-primary-text dark:text-dark-primary-text">
          This course is not yet published.
        </h1>
        <p className="text-lg text-light-secondary-text dark:text-dark-secondary-text mt-6">
          The course you&apos;re trying to access has not been published. Please
          contact the course instructor if you believe this is an error.
        </p>
      </div>
    );
  }

  // If course data hasn't loaded yet
  if (!course || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" mx-auto xl:container pt-4 pb-8 w-screen text">
      <h1 className="text-5xl text-light-primary-text dark:text-dark-primary-text capitalize text-center">
        {course.title}
      </h1>
      <p className="mx-auto max-w-screen-md text-light-secondary-text dark:text-dark-secondary-text text-center mt-12">
        {course.description}
      </p>
      {id == course.instructor && (
        <div className="flex flex-row gap-4 justify-center py-4">
          {!course.isPublished && (
            <PublishCourseButton disabled={isDisabled} courseId={courseId} />
          )}
          <button
            onClick={handleEditCourseClick}
            className="block bg-light-accent dark:bg-dark-accent text-dark-primary-text dark:text-white font-semibold px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-green-900"
          >
            Edit Course
          </button>
          <Modal
            isOpen={isEditCourseModalOpen}
          >
            <EditCourseForm courseId={courseId} closeModal={handleEditCourseModalClose}/>
          </Modal>
        </div>
      )}
      {id == course.instructor || isEnrolled ? (
        <section id="lessons" className="p-4 w-full">
          <h2 className="text-3xl text-light-primary-text dark:text-dark-primary-text text-center my-4">
            Modules
          </h2>
          {id == course.instructor && (
            <button
              onClick={handleAddModuleClick}
              className="block mx-auto bg-light-accent dark:bg-dark-accent text-dark-primary-text font-semibold px-4 my-4 py-2 rounded"
            >
              Add Module
            </button>
          )}
          {Array.isArray(course.modules) && course.modules.length > 0 ? (
            <div>
              {course.modules.map((module) => {
                return (
                  <ModuleAccordion
                    key={module._id}
                    module={module}
                    instructorId={course.instructor}
                    courseId={courseId}
                  />
                );
              })}
            </div>
          ) : (
            <span className="text-2xl text-light-secondary-text dark:text-dark-secondary-text mt-4">
              No Modules to be displayed
            </span>
          )}

          <Modal isOpen={isFormModalOpen} onClose={handleFormModalClose}>
            <AddModuleForm courseId={courseId} />
          </Modal>
        </section>
      ) : (
        <section
          id="enroll"
          className="mt-8 mx-auto max-w-screen-md p-4 border border-light-border dark:border-dark-border rounded-lg text-center"
        >
          <h2 className="text-2xl text-light-primary-text dark:text-dark-primary-text">
            Enroll in the course
          </h2>
          <p className="text-light-secondary-text dark:text-dark-secondary-text my-4">
            You need to enroll in this course to access the course materials.
          </p>
          <button
            onClick={makePayment}
            className="block mx-auto bg-light-accent dark:bg-dark-accent text-dark-primary-text font-semibold px-4 my-4 py-2 rounded"
          >
            Enroll Now
          </button>
        </section>
      )}
    </main>
  );
}

export default SingleCoursePage;

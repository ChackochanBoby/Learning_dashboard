import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import CourseCard from "../components/CourseCard"
import Modal from "../components/Modal"
import AddCourseForm from "../components/AddCourseForm"

function HomePage() {
  const { managedCourses, enrolledCourses, } = useLoaderData()
  const userFromRedux = useSelector(state => state.loginReducer.user)
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [user,setUser]=useState({})
  useEffect(() => {
    setUser(userFromRedux)
  },[userFromRedux])
  const handleAddCourse = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="mx-auto xl:container p-4 w-screen">
      <h1 className="text-4xl md:text-5xl text-center text-light-primary-text dark:text-dark-primary-text my-8">{`Hello${user ? " " + user.name : ""}`}</h1>
      <section className="p-4 my-12" id="enrolled-courses">
          <h2 className="text-2xl md:text-3xl  text-light-primary-text dark:text-dark-primary-text my-5">Enrolled Courses</h2>
          {Array.isArray(enrolledCourses)&&enrolledCourses.length>0?<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {
              enrolledCourses?(enrolledCourses.map((course)=><CourseCard key={course.id} id={course.id} title={course.title} imageSrc={course.image} instructor={course.instructor}/>)):<span>there are no managed courses</span>
            }
          </div>:<span>You are not enrolled in any courses</span>}
        </section>
      {user && Array.isArray(user.role) && user.role.includes("instructor") ? (
        <section className="p-4 my-12" id="managed-courses">
          <div className="grid grid-cols-[1fr_min-content]">
          <h2 className="text-2xl md:text-3xl  text-light-primary-text dark:text-dark-primary-text my-5">Managed Courses</h2>
          <button onClick={handleAddCourse} className="text-nowrap mx-auto bg-light-accent dark:bg-dark-accent text-dark-primary-text font-semibold px-4 my-4 py-2 rounded">Add Course</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {
              Array.isArray(managedCourses)&&managedCourses.length>0?(managedCourses.map((course)=><CourseCard title={course.title} imageSrc={course.image} id={course.id} instructor={course.instructor} key={course.id}/>)):<span>there are no managed courses</span>
            }
          </div>
        </section>
      ) : null}
              <Modal isOpen={isModalOpen} onClose={closeModal} >
              <AddCourseForm/>
            </Modal>
    </main>
  )
}

export default HomePage
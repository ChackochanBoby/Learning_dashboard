import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLoaderData } from "react-router-dom"
import CourseCard from "../components/CourseCard"

function HomePage() {
  const { managedCourses, enrolledCourses, } = useLoaderData()
  const userFromRedux = useSelector(state => state.loginReducer.user)
  const [user,setUser]=useState({})
  useEffect(() => {
    setUser(userFromRedux)
  },[userFromRedux])


  return (
    <main className="mx-auto xl:container p-4 w-screen">
      <h1 className="text-4xl md:text-5xl text-center text-light-primary-text dark:text-dark-primary-text my-8">{`Hello${user ? " " + user.name : ""}`}</h1>
      <section className="p-4 my-12" id="enrolled-courses">
          <h2 className="text-2xl md:text-3xl  text-light-primary-text dark:text-dark-primary-text my-5">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {
              enrolledCourses?(enrolledCourses.map((course)=><CourseCard key={course.id} id={course.id} title={course.title} imageSrc={course.image} instructor={course.instructor}/>)):<span>there are no managed courses</span>
            }
          </div>
        </section>
      {user && Array.isArray(user.role) && user.role.includes("instructor") ? (
        <section className="p-4 my-12" id="managed-courses">
          <h2 className="text-2xl md:text-3xl  text-light-primary-text dark:text-dark-primary-text my-5">Managed Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {
              managedCourses?(managedCourses.map((course)=><CourseCard title={course.title} imageSrc={course.image} instructor={course.instructor} key={course.id}/>)):<span>there are no managed courses</span>
            }
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default HomePage
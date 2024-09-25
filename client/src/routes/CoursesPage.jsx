import { useLoaderData } from "react-router-dom"
import CourseCard from "../components/CourseCard"

function CoursesPage() {
    const {allCourses}=useLoaderData()
  return (
      <main className="mx-auto xl:container p-4 w-screen">
          <h1 className="text-4xl md:text-5xl text-center text-light-primary-text dark:text-dark-primary-text my-8">Courses</h1>
          <section className="p-4 my-12" id="all-courses" >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {
                      allCourses.map((course) => <CourseCard key={course.id} id={course.id} title={course.title} instructor={course.instructor} imageSrc={course.image} isPaid={course.isPaid} price={course.price} category={ course.category} />)
              }
          </div>
          </section>
    </main>
  )
}

export default CoursesPage
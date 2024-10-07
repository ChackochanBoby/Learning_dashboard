import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminCourseCard from "../components/AdminCourseCard";

function AdminCoursesPage() {
    const { allCourses } = useLoaderData();
    console.log(allCourses)
    const navigate = useNavigate();
    const location = useLocation();
    
    
    const [filter, setFilter] = useState(new URLSearchParams(location.search).get("status") || "all");

    // Handle filter change
    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        // Navigate to the same page with updated filter in the query string
        navigate(`/admin/courses?status=${selectedFilter}`);
    };

    return (
        <main className="mx-auto xl:container p-4 w-screen">
            <h1 className="text-4xl md:text-5xl text-center text-light-primary-text dark:text-dark-primary-text my-8">Courses</h1>

            {/* Filter section */}
            <div className="mb-4 flex justify-center">
                <label className="mr-2 font-semibold">Filter by status:</label>
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="p-2 border rounded-lg shadow-sm"
                >
                    <option value="all">All Courses</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                </select>
            </div>

            {/* Courses Section */}
            <section className="p-4 my-12" id="all-courses">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.isArray(allCourses) && allCourses.length > 0 ? (
                        allCourses.map((course) => (
                            <AdminCourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                instructor={course.instructor}
                                imageSrc={course.image}
                                isPaid={course.isPaid}
                                price={course.price}
                                category={course.category}
                                published={course.published}
                            />
                        ))
                    ) : (
                        <span>No courses found</span>
                    )}
                </div>
            </section>
        </main>
    );
}

export default AdminCoursesPage;

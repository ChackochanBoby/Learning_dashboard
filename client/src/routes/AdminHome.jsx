import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate=useNavigate()
  const [totalUsers, setTotalUsers] = useState(0);
  const [publishedCoursesCount, setPublishedCoursesCount] = useState(0);

  useEffect(() => {
    // Fetch total users
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/total`,{withCredentials:true}).then((response) => {
      setTotalUsers(response.data.data);
    });

    // Fetch total published courses
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/total`, { withCredentials: true }).then((response) => {
      setPublishedCoursesCount(response.data.data);
    });
  }, []);

  const goToUsersPage = () => {
    navigate("/admin/userlist")
  };

  const goToCoursesPage = () => {
    navigate("/admin/courses")
  };

  return (
    <div className="flex justify-around items-center h-full p-6">
      <div 
        className="w-64 h-64 flex flex-col justify-center items-center bg-light-card-background dark:bg-dark-card-background shadow-lg rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
        onClick={goToUsersPage}
      >
        <h2 className="text-2xl font-semibold text-light-primary-text dark:text-dark-primary-text mb-4">Users</h2>
        <p className="text-xl text-light-accent dark:text-dark-accent">Total Users: {totalUsers}</p>
      </div>

      <div 
        className="w-64 h-64 flex flex-col justify-center items-center bg-white shadow-lg rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
        onClick={goToCoursesPage}
      >
        <h2 className="text-2xl font-semibold text-light-primary-text dark:text-dark-primary-text mb-4">Courses</h2>
        <p className="text-xl text-light-accent dark:text-dark-accent">Published Courses: {publishedCoursesCount}</p>
      </div>
    </div>
  );
};

export default AdminHome

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "./ConfirmationPopup";

const AdminCourseCard = ({ id, imageSrc, title, instructor, isPaid, price, published }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  
  const [isPopupOpen, setPopupOpen] = useState(false)
  
  const openPopup = () => {
    setPopupOpen(true)
  }

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownVisible((prev) => !prev);
    console.log("Dropdown toggled:", !dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
      console.log("Clicked outside, dropdown closed");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <article className="relative bg-light-card-background dark:bg-dark-card-background border border-light-border dark:border-dark-border rounded-lg overflow-visible shadow-lg">
      <img src={imageSrc} alt="Course" className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-light-primary-text dark:text-dark-primary-text text-2xl font-bold">{title}</h2>
        <h3 className="text-light-secondary-text dark:text-dark-secondary-text mt-2">{instructor}</h3>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-light-accent dark:text-dark-accent font-semibold">
            {isPaid ? `₹ ${price}` : "Free"}
          </span>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-light-primary-text dark:text-dark-primary-text p-2 focus:outline-none"
            >
              ⋮
            </button>

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-card-background shadow-lg rounded-md z-50">
                <ul className="py-2">
                  {
                    published&&<li
                    onClick={() => {
                      axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/unpublish/${id}`,{},{withCredentials:true})
                      .then(()=>navigate(0))
                        setDropdownVisible(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-light-background dark:hover:bg-dark-background"
                  >
                    Unpublish
                  </li>
                  }
                  <li
                    onClick={openPopup}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-light-background dark:hover:bg-dark-background"
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {
        isPopupOpen && <ConfirmationPopup onClose={() => setPopupOpen(false)} onConfirm={() => {
          axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/delete/${id}/admin`,{withCredentials:true})
            .then(() => navigate(0))
                        setPopupOpen(false)
                        setDropdownVisible(false);
        }} actionType="delete" message={"are you sure you want to delete this course?"} />
      }
    </article>
  );
};

export default AdminCourseCard;

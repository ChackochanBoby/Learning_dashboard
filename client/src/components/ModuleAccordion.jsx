import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import AddLessonForm from "./AddLessonForm";
import UpdateModuleForm from "./UpdateModuleForm";
import ConfirmationPopup from "./ConfirmationPopup"; // Make sure to import your ConfirmationPopup
import axios from "axios";

function ModuleAccordion({ module, instructorId, courseId }) {
  const navigate = useNavigate();
  const [isAddLessonModalOpen, setAddLessonModalOpen] = useState(false);
  const [isEditModuleModalOpen, setEditModuleModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useSelector((state) => state.loginReducer.user);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.id === instructorId) {
        setIsInstructor(true);
      }
    }
  }, [user, instructorId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const deleteModule = async (moduleId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/module/delete/${moduleId}`,
        { withCredentials: true }
      );
      console.log(response.data.message);
      // Optionally, refresh or update your module list here
    } catch (error) {
      console.log(error.message);
    }
  };

  const openDeletePopup = () => {
    setPopupOpen(true);
  };

  const confirmDeleteModule = () => {
    deleteModule(module._id); // Call the delete function
    setPopupOpen(false); // Close the popup
    navigate(0)
  };

  // Function to expand or collapse the module
  const toggleModuleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const openAddLessonModal = () => {
    setAddLessonModalOpen(true);
  };

  const closeAddLessonModal = () => {
    setAddLessonModalOpen(false);
  };

  const openEditModuleModal = () => {
    setEditModuleModalOpen(true);
  };

  const closeEditModuleModal = () => {
    setEditModuleModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <article className="w-full max-w-screen-lg mx-auto border-b border-light-border dark:border-dark-border mb-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_min-content] p-4 bg-light-card-background dark:bg-dark-card-background transition">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-light-primary-text dark:text-dark-primary-text">
            {module.title}
          </h3>
          <p className="text-xs md:text-sm text-light-secondary-text dark:text-dark-secondary-text mt-1">
            {module.description}
          </p>
        </div>

        <div className="flex justify-end md:justify-center items-center gap-3 mt-2 md:mt-0 p-2">
          <button
            onClick={toggleModuleExpansion}
            className="px-3 py-2 border border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent bg-transparent rounded-md hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition text-xs md:text-sm"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          {isInstructor ? (
            <div ref={menuRef} className="relative">
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-light-background dark:hover:bg-dark-background text-light-primary-text dark:text-dark-primary-text rounded-full transition text-xl font-extrabold"
              >
                ⋮
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark-background rounded-md shadow-lg z-10">
                  <ul className="py-1 text-sm text-light-primary-text dark:text-dark-primary-text">
                    <li
                      onClick={openAddLessonModal}
                      className="px-4 py-2 hover:bg-light-accent dark:hover:bg-dark-accent cursor-pointer"
                    >
                      Add Lesson
                    </li>
                    <li
                      onClick={openEditModuleModal}
                      className="px-4 py-2 hover:bg-light-accent dark:hover:bg-dark-accent cursor-pointer"
                    >
                      Edit Module
                    </li>
                    <li
                      onClick={openDeletePopup}
                      className="px-4 py-2 hover:bg-light-accent dark:hover:bg-dark-accent cursor-pointer"
                    >
                      Delete Module
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-light-background dark:bg-dark-background">
          <ul className="list-inside text-light-secondary-text dark:text-dark-secondary-text space-y-3">
            {module.lessons && module.lessons.length > 0 ? (
              module.lessons.map((lesson) => (
                <li
                  key={lesson._id}
                  className="p-3 bg-white dark:bg-dark-card-background shadow-md rounded-lg transition flex justify-between items-center"
                >
                  <h4 className="text-sm md:text-base font-medium text-light-primary-text dark:text-dark-primary-text">
                    {lesson.title}
                  </h4>
                  <button
                    onClick={() =>
                      navigate(`/${courseId}/lesson/${lesson._id}`)
                    }
                    className="px-3 py-1 text-xs md:text-sm font-medium bg-light-accent dark:bg-dark-accent text-white rounded-md hover:bg-light-accent-dark dark:hover:bg-dark-accent-dark transition"
                  >
                    Go to
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="text-xs md:text-sm text-light-secondary-text dark:text-dark-secondary-text">
                  There are no lessons yet
                </span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Modal for Adding Lesson */}
      <Modal isOpen={isAddLessonModalOpen} onClose={closeAddLessonModal}>
        <AddLessonForm courseId={courseId} moduleId={module._id} />
      </Modal>
      <Modal isOpen={isEditModuleModalOpen} onClose={closeEditModuleModal}>
        <UpdateModuleForm moduleId={module._id} />
      </Modal>

      {/* Confirmation Popup for Deletion */}
      {isPopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to delete this module? This action will also delete all lessons associated with it and cannot be undone."
          onConfirm={confirmDeleteModule}
          actionType="delete"
          onClose={() => setPopupOpen(false)}
        />
      )}
    </article>
  );
}

export default ModuleAccordion;

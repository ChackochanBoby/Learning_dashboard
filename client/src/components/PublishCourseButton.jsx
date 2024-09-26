import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationPopup from "./ConfirmationPopup";

function PublishCourseButton({ courseId, disabled }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [actionType, setActionType] = useState("confirm");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/course/publish/${courseId}`,
        { withCredentials: true }
      );
      setPopupMessage("The course has been published successfully!");
      setActionType("success"); // Set action type for success
    } catch (error) {
      setPopupMessage(error.message);
      setActionType("error"); // Set action type for error
      console.log(error);
    } finally {
      setPopupOpen(true);
      setIsPublishing(false);
    }
  };

  return (
    <>
      <button
        disabled={isDisabled || isPublishing}
        onClick={handlePublish}
        className={`block bg-light-accent dark:bg-dark-accent text-dark-primary-text dark:text-white font-semibold px-4 py-2 rounded transition duration-300 ease-in-out ${
          isDisabled || isPublishing
            ? "bg-gray-400 cursor-not-allowed"
            : "hover:bg-green-900"
        }`}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>

      {isPopupOpen && (
        <ConfirmationPopup message={popupMessage} actionType={actionType} onClose={()=>setPopupOpen(false)} />
      )}
    </>
  );
}

export default PublishCourseButton;

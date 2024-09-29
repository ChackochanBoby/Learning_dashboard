import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationPopup from "./ConfirmationPopup";
import { useNavigate } from "react-router-dom";

function PublishCourseButton({ courseId, disabled }) {
  const navigate=useNavigate()
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
        }/api/v1/course/publish/${courseId}`,{},
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
        className={`px-4 py-2 font-semibold rounded transition duration-300 ease-in-out ${
        disabled
          ? "bg-gray-400 cursor-not-allowed text-gray-600 dark:bg-gray-600 dark:text-gray-400"
          : "bg-light-accent dark:bg-dark-accent hover:bg-green-900 text-white"
      }`}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>

      {isPopupOpen && (
        <ConfirmationPopup message={popupMessage} actionType={actionType} onClose={()=>setPopupOpen(false)} onConfirm={()=>navigate(0)} />
      )}
    </>
  );
}

export default PublishCourseButton;

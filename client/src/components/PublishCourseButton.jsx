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
      setPopupMessage("Error publishing the course. Please try again.");
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
        className={`px-4 py-2 rounded-lg font-semibold text-white ${
          isDisabled || isPublishing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>

      {isPopupOpen && (
        <ConfirmationPopup message={popupMessage} actionType={actionType} />
      )}
    </>
  );
}

export default PublishCourseButton;
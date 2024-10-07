const ConfirmationPopup = ({ message, onConfirm, onClose, actionType = "confirm" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-background rounded-lg shadow-lg p-6 w-96 max-w-xs">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {actionType === "delete" ? "Confirm Deletion" : actionType === "success" ? "Success" : "Error"}
        </h2>
        <p className="text-sm mb-6 text-center text-black dark:text-gray-200">
          {message}
        </p>
        <div className="flex justify-around">
          {(actionType!=="success"||actionType!=="Error")&&<button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-light-background rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {actionType === "error" ? "Close" : "Cancel"}
          </button>}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${actionType === "delete" ? "bg-red-600 hover:bg-red-700" : actionType === "success" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md transition`}
          >
            {actionType === "delete" ? "Delete" : "Okay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;

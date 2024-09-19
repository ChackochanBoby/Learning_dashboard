const GeneralErrorComponent = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md 
        bg-light-background dark:bg-dark-background border 
        border-light-border dark:border-dark-border">
        <h2 className="text-light-primary-text dark:text-dark-primary-text text-2xl font-bold">Error</h2>
        <p className="text-light-secondary-text dark:text-dark-secondary-text mt-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 bg-light-accent dark:bg-dark-accent text-white py-2 px-4 rounded hover:bg-light-accent-dark dark:hover:bg-dark-accent-dark"
          >
            Retry
          </button>
        )}
      </div>
    );
  };
  
  export default GeneralErrorComponent;
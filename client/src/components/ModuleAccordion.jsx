import { useState } from "react";

function ModuleAccordion({ module }) {
  const [isExpanded, setIsExpanded] = useState(false); // Tracks whether the module is expanded

  // Function to expand or collapse the module
  const toggleModuleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto border-b border-light-border dark:border-dark-border mb-4">
      {/* Accordion Header - Module Title and Description */}
      <div
        onClick={toggleModuleExpansion}
        className="cursor-pointer p-4 bg-light-card-background dark:bg-dark-card-background hover:bg-light-border dark:hover:bg-dark-border transition"
      >
        <h3 className="text-lg font-semibold text-light-primary-text dark:text-dark-primary-text">
          {module.title}
        </h3>
        <p className="text-sm text-light-secondary-text dark:text-dark-secondary-text mt-1">
          {module.description} {/* Display module description here */}
        </p>
      </div>

      {/* Accordion Content - Lessons List (expanded only if active) */}
      {isExpanded && (
        <div className="p-4 bg-light-background dark:bg-dark-background">
          <ul className="list-disc list-inside text-light-secondary-text dark:text-dark-secondary-text">
            {module.lessons.map((lesson) => (
              <li key={lesson._id}>{lesson.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModuleAccordion;


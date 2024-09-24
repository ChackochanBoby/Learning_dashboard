import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ModuleAccordion({ module,instructorId }) {
  const [isExpanded, setIsExpanded] = useState(false); // Tracks whether the module is expanded
    const user = useSelector(state => state.loginReducer.user)
    const [isInstructor, setIsInstructor] = useState(false)
    useEffect(() => {
        if (user) {
            if (user.id === instructorId) {
                setIsInstructor(true)   
            }
        }
    },[user,instructorId])
  // Function to expand or collapse the module
  const toggleModuleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="w-full max-w-screen-md mx-auto border-b border-light-border dark:border-dark-border mb-4">
      {/* Accordion Header - Module Title and Description */}
      <div className="grid grid-cols-[1fr_min-content] p-4 bg-light-card-background dark:bg-dark-card-background hover:bg-light-border dark:hover:bg-dark-border transition"
      >
              <div>
              <h3 className="text-lg font-semibold text-light-primary-text dark:text-dark-primary-text">
          {module.title}
        </h3>
        <p className="text-sm text-light-secondary-text dark:text-dark-secondary-text mt-1">
          {module.description} {/* Display module description here */}
        </p>
              </div>
              <div className="flex justify-center my-auto gap-3 p-2">
                  {isInstructor?<Link className="whitespace-nowrap block px-4 py-2 bg-light-accent dark:bg-dark-accent text-dark-primary-text">add Lesson</Link>:null}
                  <button onClick={toggleModuleExpansion}>{isExpanded ? "collapse" : "expand"}</button>
              </div>
      </div>

      {/* Accordion Content - Lessons List (expanded only if active) */}
      {isExpanded && (
        <div className="p-4 bg-light-background dark:bg-dark-background">
          <ul className="list-disc list-inside text-light-secondary-text dark:text-dark-secondary-text">
            {
                (module.lessons&&module.lessons.leangth>0)?(module.lessons.map((lesson) => (
                    <li key={lesson._id}>{lesson.title}</li>
                  ))):<li><span className="text-light-secondary-text dark:text-dark-secondary-text">There are no lessons yet</span></li>
            }
          </ul>
        </div>
      )}
    </article>
  );
}

export default ModuleAccordion;


const CourseCard = ({ imageSrc, title, instructor, price }) => {
  return (
    <article className="bg-light-card-background dark:bg-dark-card-background border-light-border dark:border-dark-border border rounded-lg overflow-hidden shadow-lg">
      <img src={imageSrc} alt="Course" className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-light-primary-text dark:text-dark-primary-text text-2xl font-bold">
          {title}
        </h2>
        <h3 className="text-light-secondary-text dark:text-dark-secondary-text mt-2">
          {instructor}
        </h3>
        {/* <div className="mt-4 flex justify-between items-center">
          <span className="text-light-accent dark:text-dark-accent font-semibold">
            ${price}
          </span>
          <button className="bg-light-button-background dark:bg-dark-button-background text-light-primary-text dark:text-dark-primary-text py-2 px-4 rounded hover:bg-light-accent dark:hover:bg-dark-accent">
            Enroll Now
          </button>
        </div> */}
      </div>
    </article>
  );
};

export default CourseCard;

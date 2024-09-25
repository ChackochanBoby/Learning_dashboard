import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GeneralErrorComponent from "../components/GeneralErrorComponent";
import { useSelector } from "react-redux";

function LessonPage() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/lesson/${courseId}/${lessonId}`,
          { withCredentials: true }
        );
        setLesson(lessonResponse.data.data);
        setLoading(false);
      } catch (error) {
        setErr(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchLesson();
    }
  }, [lessonId, courseId, user]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }
  
  if (err) {
    return (
      <GeneralErrorComponent
        message={err.message}
        onRetry={() => {
          navigate(0);
        }}
      />
    );
  }
  
  if (!lesson) {
    return <p className="text-center text-gray-400">No lesson found</p>;
  }

  return (
    <main className="mx-auto xl:container p-4 w-full max-w-4xl">
      <h1 className="text-4xl md:text-5xl text-center text-light-primary-text dark:text-dark-primary-text my-8 capitalize font-bold">
        {lesson.title}
      </h1>
      <p className="mx-auto max-w-screen-md text-light-secondary-text dark:text-dark-secondary-text text-center mt-4 mb-8 px-4">
        {lesson.introduction}
      </p>

      {lesson.type === "reading" ? (
        <section id="reading-material" className="mt-8 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-light-primary-text dark:text-dark-primary-text text-center capitalize">
            Lesson Content
          </h2>
          <div className="mx-auto max-w-screen-md text-light-secondary-text dark:text-dark-secondary-text">
            {lesson.content}
          </div>

          {lesson.refLinks && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-light-primary-text dark:text-dark-primary-text">Reference Links</h3>
              <ul className="list-disc list-inside pl-5">
                {lesson.refLinks.split(",").map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-accent underline hover:text-dark-accent-light"
                    >
                      {link.trim()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ) : lesson.type === "video" ? (
        <section id="video-lesson" className="mt-8 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-2xl text-center text-light-primary-text dark:text-dark-primary-text my-4 capitalize font-semibold">
            Watch the Video
          </h2>
          <div className="md:w-[calc(100vw-20vw)] max-w-[50rem] mx-auto mt-4">
            <iframe
              src={lesson.videoLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-60 md:h-80 rounded-lg"
            ></iframe>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default LessonPage;

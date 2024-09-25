import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddLessonForm({ courseId, moduleId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [lessonType, setLessonType] = useState("reading"); // Default lesson type
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/lesson/course/${courseId}/module/${moduleId}/addlesson`, data, { withCredentials: true });
      navigate(0);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="type" className="text-sm font-medium">
        Lesson Type
      </label>
      <select
        id="type"
        {...register("type", { required: "Lesson type is required" })}
        onChange={(e) => setLessonType(e.target.value)}
        className="w-full border-2 h-10 rounded-lg text-sm px-2"
      >
        <option value="reading">Reading</option>
        <option value="video">Video</option>
      </select>
      {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

      <label htmlFor="title" className="text-sm font-medium">
        Title
      </label>
      <input
        id="title"
        type="text"
        {...register("title", { required: "Title is required" })}
        className="w-full border-2 h-10 rounded-lg text-sm px-2"
        placeholder="Enter lesson title"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label htmlFor="introduction" className="text-sm font-medium">
        Introduction
      </label>
      <textarea
        id="introduction"
        {...register("introduction", { required: "Introduction is required" })}
        className="w-full border-2 rounded-lg text-sm px-2 py-1"
        placeholder="Enter lesson introduction"
      />
      {errors.introduction && <p className="text-red-500 text-sm">{errors.introduction.message}</p>}

      {lessonType === "reading" && (  // Use lessonType state directly
        <>
          <label htmlFor="content" className="text-sm font-medium">
            Lesson Content
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            className="w-full border-2 rounded-lg text-sm px-2 py-1"
            placeholder="Enter lesson content"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

          <label htmlFor="refLinks" className="text-sm font-medium">
            Reference Links (comma-separated)
          </label>
          <input
            id="refLinks"
            type="text"
            {...register("refLinks")}
            className="w-full border-2 h-10 rounded-lg text-sm px-2"
            placeholder="Enter reference links"
          />
        </>
      )}

      {lessonType === "video" && (  // Use lessonType state directly
        <>
          <label htmlFor="videoLink" className="text-sm font-medium">
            Video Link (YouTube)
          </label>
          <input
            id="videoLink"
            type="url"
            {...register("videoLink", { required: "Video link is required" })}
            className="w-full border-2 h-10 rounded-lg text-sm px-2"
            placeholder="Enter YouTube video link"
          />
          {errors.videoLink && <p className="text-red-500 text-sm">{errors.videoLink.message}</p>}
        </>
      )}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Add Lesson
      </button>
    </form>
  );
}

export default AddLessonForm;

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourseForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/addcourse`, data, { withCredentials: true });
      const courseId = response.data.data._id
        navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="title" className="text-sm font-medium">
        Course Title
      </label>
      <input
        id="title"
        type="text"
        {...register("title", { required: "Title is required" })}
        className="w-full border-2 h-10 rounded-lg text-sm px-2"
        placeholder="Enter course title"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>
      <textarea
        id="description"
        {...register("description", { required: "Description is required" })}
        className="w-full border-2 rounded-lg text-sm px-2 py-1"
        placeholder="Enter course description"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <label htmlFor="category" className="text-sm font-medium">
        Category
      </label>
      <input
        id="category"
        type="text"
        {...register("category", { required: "Category is required" })}
        className="w-full border-2 h-10 rounded-lg text-sm px-2"
        placeholder="Enter course category"
      />
      {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Create Course
      </button>
    </form>
  );
}

export default AddCourseForm;

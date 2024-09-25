import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddModuleForm({ courseId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/module/${courseId}/addmodule`, data, { withCredentials: true });
      navigate(0); // Reload the page after adding the module
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="title" className="text-sm font-medium">
        Module Title
      </label>
      <input
        id="title"
        type="text"
        {...register("title", { required: "Title is required" })}
        className="w-full border-2 h-10 rounded-lg text-sm px-2"
        placeholder="Enter module title"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>
      <textarea
        id="description"
        {...register("description", { required: "Description is required" })}
        className="w-full border-2 rounded-lg text-sm px-2 py-1"
        placeholder="Enter module description"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Add Module
      </button>
    </form>
  );
}

export default AddModuleForm;

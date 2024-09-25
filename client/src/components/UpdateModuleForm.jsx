import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function UpdateModuleForm({ moduleId}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [module,setModule] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/module/${moduleId}`, { withCredentials: true })
      .then(response => {
      setModule(response.data.data)
    })
  })

  const onSubmit = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/module/edit/${moduleId}`, data, { withCredentials: true });
      navigate(0);
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
        defaultValue={module?.title}
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
        defaultValue={module?.description}
        {...register("description", { required: "Description is required" })}
        className="w-full border-2 rounded-lg text-sm px-2 py-1"
        placeholder="Enter module description"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Update Module
      </button>
    </form>
  );
}

export default UpdateModuleForm;
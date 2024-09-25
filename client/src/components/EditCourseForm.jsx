import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditCourseForm({ courseId }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    // Fetch the existing course data to pre-fill the form
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`, { withCredentials: true });
        const courseData = response.data.data;

        // Set form values based on fetched data
        setValue("title", courseData.title);
        setValue("description", courseData.description);
        setValue("category", courseData.category);
        setIsPaid(courseData.isPaid);
        setValue("price", courseData.price || ""); // Set price if it exists
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseData();
  }, [courseId, setValue]);

  const onSubmit = async (data) => {
    try {
      // Include isPaid in the data object
      data.isPaid = isPaid; // Ensure isPaid is included in the submitted data
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/edit/${courseId}`, data, { withCredentials: true });
      navigate(0);
    } catch (error) {
      console.error(error);
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

      <fieldset className="mt-4">
        <legend className="text-sm font-medium">Payment Option</legend>
        <div className="flex items-center">
          <input
            type="radio"
            id="free"
            value="free"
            checked={!isPaid}
            onChange={() => {
              setIsPaid(false);
              setValue("price", ""); // Clear price field when free is selected
            }}
          />
          <label htmlFor="free" className="ml-2">Free</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="paid"
            value="paid"
            checked={isPaid}
            onChange={() => {
              setIsPaid(true);
              setValue("price", ""); // Reset price when switching options
            }}
          />
          <label htmlFor="paid" className="ml-2">Paid</label>
        </div>
      </fieldset>

      {isPaid && (
        <>
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { required: isPaid ? "Price is required" : false })}
            className="w-full border-2 h-10 rounded-lg text-sm px-2"
            placeholder="Enter course price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </>
      )}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Edit Course
      </button>
    </form>
  );
}

export default EditCourseForm;

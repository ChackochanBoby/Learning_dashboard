import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditCourseForm({ courseId }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  const [defaultCourseValues, setDefaultCourseValues] = useState();
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`, { withCredentials: true });
        const courseData = response.data.data;
        setDefaultCourseValues(courseData);

        reset({
          title: courseData.title || "",
          description: courseData.description || "",
          category: courseData.category || "",
          price: courseData.price || "",
        });

        setIsPaid(courseData.isPaid);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseData();
  }, [courseId, reset]);

  const onSubmit = async (data) => {
    try {
      data.isPaid = isPaid;
      data.price = isPaid ? data.price : 0;

      // Create a FormData instance to include the image
      const requestData = new FormData();
      requestData.append("title", data.title);
      requestData.append("description", data.description);
      requestData.append("category", data.category);
      requestData.append("isPaid", data.isPaid);
      requestData.append("price", data.price);
      
      if (selectedFile) {
        requestData.append("image", selectedFile); // Append the selected file
      }

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/v1/course/edit/${courseId}`, requestData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate(0); // Refresh or redirect as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-4">
      <label htmlFor="title" className="text-sm font-medium">
        Course Title
      </label>
      <input
        id="title"
        defaultValue={defaultCourseValues?.title}
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
        defaultValue={defaultCourseValues?.description}
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
        defaultValue={defaultCourseValues?.category}
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
              reset({ price: "" }); // Clear price field when free is selected
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
              reset({ price: "" }); // Reset price when switching options
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
            defaultValue={Number(defaultCourseValues?.price)}
            type="number"
            {...register("price", { required: isPaid ? "Price is required" : false })}
            className="w-full border-2 h-10 rounded-lg text-sm px-2"
            placeholder="Enter course price"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </>
      )}

      <label htmlFor="image" className="text-sm font-medium">
        Thumbnail Image (Optional)
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])} // Handle file selection
        className="border-2 rounded-lg text-sm px-2"
      />

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

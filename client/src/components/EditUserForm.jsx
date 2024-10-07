import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationPopup from "./ConfirmationPopup"
import { useLocation } from "react-router-dom"

export default function EditUserForm() {
  const location=useLocation()
    const navigate = useNavigate()
    const [isSubmitting,setIsSubmitting]=useState(false)
  const [user, setUser] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [isPopupOpen, setIsPopupOpen]= useState(false)
    const [popupMessage, setPopupMessage] = useState(null)
    const [popupActionType,setPopupActionType]=useState("success")

  const isAdmin = location.pathname.startsWith("/admin")
  const userId = useSelector(state => isAdmin?state.adminLoginReducer.admin.id:state.loginReducer.user.id)
    const onPopupConfirm = () => {
        navigate(0)
    }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/${isAdmin?"admin":"user"}/profile`, { withCredentials: true })
        setUser(userProfile.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserProfile()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    if (user) {
      setValue("name", user.name)
    }
  }, [user, setValue])

    const onSubmit = async (data) => {
        setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", data.name)
      if (profilePic) {
        formData.append("profilePic", profilePic)
      }

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/${isAdmin?"admin":"user"}/update/${userId}`,
        formData,
          { withCredentials: true }
        )
        setPopupMessage("User Updated Successfully")
        setPopupActionType("success")
    } catch (error) {
        console.error("Error updating profile:", error)
        setPopupMessage(error.response.data.message)
        setPopupActionType("error")
        }
    finally {
        setIsSubmitting(false)
        setIsPopupOpen(true)
        }
  }

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0])
  }

  return (<>
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-light-background dark:bg-dark-background p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-light-primary-text dark:text-dark-primary-text font-bold mb-2">
          Name
        </label>
        <input
          id="name"
          defaultValue={user?.name}
          {...register("name")}
          placeholder="Enter your name"
          className="w-full p-2 border-light-border dark:border-dark-border bg-light-card-background dark:bg-dark-card-background text-light-primary-text dark:text-dark-primary-text rounded"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="profilePic" className="block text-light-primary-text dark:text-dark-primary-text font-bold mb-2">
          Profile Picture
        </label>
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border-light-border dark:border-dark-border bg-light-card-background dark:bg-dark-card-background text-light-primary-text dark:text-dark-primary-text rounded"
        />
      </div>

      <input
              type="submit"
              value="Update Profile"
              disabled={isSubmitting}
              className={`${isSubmitting?"bg-gray-600 text-gray-400 cursor-not-allowed":"bg-light-button-background dark:bg-dark-button-background text-light-primary-text dark:text-dark-primary-text cursor-pointer hover:bg-light-accent dark:hover:bg-dark-accent"} px-4 py-2 rounded `}
          />
      </form>
      {
          isPopupOpen&&<ConfirmationPopup actionType={popupActionType} onConfirm={onPopupConfirm} message={popupMessage}/>
      }
      </>
  )
}

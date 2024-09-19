import { useLoaderData, useNavigate } from "react-router-dom";
import GeneralErrorComponent from "../components/GeneralErrorComponent";

const getRandomColor = () => {
  const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#8A2BE2"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfilePage = () => {
  const navigate = useNavigate();
    const data = useLoaderData();
    console.log(data)

  if (!data.success) {
    if (data.errorCode === "UNAUTHORIZED") {
      return navigate("/login");
    } else if (data.errorCode === "GENERAL_ERROR") {
      return (
        <GeneralErrorComponent
          message="An error occurred while fetching your profile."
          onRetry={() => window.location.reload()}/>
      );
    }
  }

  const { name, email, roles, profile_img } = data.profileData;

  const initials = name ? name.charAt(0).toUpperCase() : "";
  const hasProfileImage = !!profile_img;

  return (
    <main className="bg-light-background dark:bg-dark-background flex items-center justify-center">
      <div className="bg-light-card-background dark:bg-dark-card-background border-light-border dark:border-dark-border border rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Image */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-b-2 border-light-border dark:border-dark-border">
          {hasProfileImage ? (
            <img
              src={profile_img}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-2 border-light-border dark:border-dark-border"
            />
          ) : (
            <div
              className="w-32 h-32 flex items-center justify-center rounded-full"
              style={{ backgroundColor: getRandomColor() }}
            >
              <span className="text-4xl font-bold text-light-primary-text dark:text-dark-primary-text">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="p-6">
          <h1 className="text-light-primary-text dark:text-dark-primary-text text-3xl font-bold text-center">
            {name}
          </h1>
          <p className="text-light-secondary-text dark:text-dark-secondary-text mt-2 text-center">
            Roles: {roles.join(", ")}
          </p>
          <p className="text-light-secondary-text dark:text-dark-secondary-text mt-1 text-center">
            Email: {email}
          </p>
        </div>

        {/* Edit Button */}
        <div className="p-6 border-t-2 border-light-border dark:border-dark-border">
          <button className="w-full bg-light-accent dark:bg-dark-accent text-white py-2 px-4 rounded hover:bg-light-accent-dark dark:hover:bg-dark-accent-dark">
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

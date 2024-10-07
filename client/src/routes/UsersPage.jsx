import { useState, useEffect } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/allusers`, {
          params: { role },
          withCredentials: true,
        });
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by role:</label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="p-2 border rounded-lg shadow-sm"
        >
          <option value="">All Roles</option>
          <option value="instructor">Instructor</option>
          <option value="learner">Learner</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users, please wait...</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="text-sm text-blue-500 font-semibold">
                    Role: {user.roles.join(", ")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">No users found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;

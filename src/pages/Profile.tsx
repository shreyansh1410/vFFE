import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface User {
  id: number;
  email: string;
  name: string;
  appliedJobs: { id: number; job_title: string }[];
  savedJobs: { id: number; job_title: string }[];
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const { user: clerkUser } = useUser();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/users/me`).then((res) => setUser(res.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Saved Jobs</h2>
        {user.savedJobs.length === 0 ? (
          <p>No saved jobs</p>
        ) : (
          <ul className="list-disc pl-5">
            {user.savedJobs.map((job) => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`} className="text-blue-500">
                  {job.job_title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Applied Jobs</h2>
        {user.appliedJobs.length === 0 ? (
          <p>No applied jobs</p>
        ) : (
          <ul className="list-disc pl-5">
            {user.appliedJobs.map((job) => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`} className="text-blue-500">
                  {job.job_title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;

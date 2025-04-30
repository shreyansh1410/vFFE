import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface JobData {
  savedJobs: { id: number; job_title: string }[];
  appliedJobs: { id: number; job_title: string }[];
}

function Profile() {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const { user: clerkUser } = useUser();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (clerkUser) {
      axios
        .get(`${BACKEND_URL}/api/users/me`)
        .then((res) => setJobData(res.data));
    }
  }, [clerkUser]);

  if (!clerkUser || !jobData) return <div>Loading...</div>;

  const savedJobs = jobData.savedJobs || [];
  const appliedJobs = jobData.appliedJobs || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {clerkUser.fullName}</p>
      <p>Email: {clerkUser.primaryEmailAddress?.emailAddress}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Saved Jobs</h2>
        {savedJobs.length === 0 ? (
          <p>No saved jobs</p>
        ) : (
          <ul className="list-disc pl-5">
            {savedJobs.map((job) => (
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
        {appliedJobs.length === 0 ? (
          <p>No applied jobs</p>
        ) : (
          <ul className="list-disc pl-5">
            {appliedJobs.map((job) => (
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

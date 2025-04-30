import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface JobData {
  savedJobs: { id: number; job_title: string }[];
  appliedJobs: { id: number; job_title: string }[];
  name: string;
  email: string;
}

function Profile() {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJobData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobData(response.data);
      } catch (error) {
        console.error("Failed to fetch job data", error);
        setJobData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJobData();
  }, [BACKEND_URL, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>Failed to load profile.</div>;
  }

  const savedJobs = jobData.savedJobs || [];
  const appliedJobs = jobData.appliedJobs || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {jobData.name || "N/A"}</p>
      <p>Email: {jobData.email || "N/A"}</p>
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

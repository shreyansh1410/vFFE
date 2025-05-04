import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Job {
  id: number;
  company: string;
  job_title: string;
  job_location: string;
  salary: number;
  full_description: string;
  job_type: string;
  work_setting: string;
  experience_level: string;
  h1Type: string;
  job_category: string;
}

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const isSignedIn = Boolean(localStorage.getItem("token"));

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/jobs/${id}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job saved!");
    } catch (error) {
      alert("Failed to save job");
    }
  };

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Applied successfully!");
    } catch (error) {
      alert("Failed to apply");
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{job.job_title}</h1>
      <p className="text-lg">
        {job.company} - {job.job_location}
      </p>
      <p>Salary: ${job.salary}</p>
      <p>Job Type: {job.job_type}</p>
      <p>Work Setting: {job.work_setting}</p>
      <p>Experience Level: {job.experience_level}</p>
      <p>H1 Type: {job.h1Type}</p>
      <p>Category: {job.job_category}</p>
      <p className="mt-4">{job.full_description}</p>
      {isSignedIn && (
        <div className="mt-4 space-x-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Job
          </button>
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default JobDetails;

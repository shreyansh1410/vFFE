import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Job {
  id: number;
  company: string;
  job_title: string;
  job_location: string;
  salary: number;
}

function Home() {
  const navigate = useNavigate();
  const isSignedIn = Boolean(localStorage.getItem("token"));
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    job_type: "",
    experience_level: "",
    work_setting: "",
    h1Type: "",
    job_category: "",
  });

  const fetchJobs = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`${BACKEND_URL}/api/jobs?${query}`);
      const jobsData = Array.isArray(res.data) ? res.data : [];
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signin");
      return;
    }
    fetchJobs();
    // eslint-disable-next-line
  }, [isSignedIn]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>
            <form onSubmit={handleSearch}>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by title or company"
                  className="w-60 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Location"
                  className="w-36 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  name="salaryMin"
                  value={filters.salaryMin}
                  onChange={handleFilterChange}
                  placeholder="Min Salary"
                  className="w-36 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  name="salaryMax"
                  value={filters.salaryMax}
                  onChange={handleFilterChange}
                  placeholder="Max Salary"
                  className="w-36 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {[
                  {
                    name: "job_type",
                    label: "Job Type",
                    options: ["Full-Time", "Contract"],
                  },
                  {
                    name: "experience_level",
                    label: "Experience Level",
                    options: ["Mid senior", "Associate"],
                  },
                  {
                    name: "work_setting",
                    label: "Work Setting",
                    options: ["Onsite", "Remote", "Hybrid"],
                  },
                  {
                    name: "h1Type",
                    label: "H1 Type",
                    options: ["H-1B", "Cap-Exempt"],
                  },
                  {
                    name: "job_category",
                    label: "Job Category",
                    options: ["Engineering (Software)", "UI/UX & Design"],
                  },
                ].map((field) => (
                  <select
                    key={field.name}
                    name={field.name}
                    value={filters[field.name as keyof typeof filters]}
                    onChange={handleFilterChange}
                    className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">{field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors ml-auto"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Job Listings
          </h1>
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {job.company} • {job.job_location}
                    </p>
                    <p className="text-gray-700 font-medium">
                      ${job.salary.toLocaleString()} per year
                    </p>
                  </div>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

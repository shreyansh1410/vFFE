import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors"
          >
            VisaFriendly Jobs
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut(() => navigate("/"))}
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

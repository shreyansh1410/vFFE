import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) return <Navigate to="/signin" />;
  return children;
}

export default ProtectedRoute;

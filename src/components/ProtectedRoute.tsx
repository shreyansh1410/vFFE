import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (token === null) return <Navigate to="/signin" />;
  return children;
}

export default ProtectedRoute;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="py-8">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route
              path="/signin"
              element={
                <SignedOut>
                  <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">
                      Sign In
                    </h1>
                    <SignIn routing="path" path="/signin" />
                  </div>
                </SignedOut>
              }
            />
            <Route
              path="/signup"
              element={
                <SignedOut>
                  <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">
                      Sign Up
                    </h1>
                    <SignUp routing="path" path="/signup" />
                  </div>
                </SignedOut>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

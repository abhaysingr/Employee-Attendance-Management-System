import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


import Home from './components/HeroSection.jsx';
import Forgotpassword from './forgotpasswordpage.jsx';
import LoadingScreen from './LoadingScreen.jsx'; // Import the LoadingScreen component
import { SignIn } from './SignIn.jsx';
import { SignUp } from './SignUp.jsx';
import { UserSignUp } from './UserSignUp.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AdminDashboard from '../adminDashboard.jsx';
import EmployeeDashboard from '../employeeDashboard.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/usersignup', element: <UserSignUp /> },
  { path: '/forgotpassword', element: <Forgotpassword /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/employee', element: <EmployeeDashboard /> },
 
  {path: '/navbar', element: <Navbar/>},
  {path: '/footer', element: <Footer/>},
  {path: '/home', element: <Home/>},
]);

// Wrapper to handle loading state
export default function AppWrapper() {
  const [loading, setLoading] = useState(true);

  // Simulate loading time when app starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <RouterProvider router={router} />
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);
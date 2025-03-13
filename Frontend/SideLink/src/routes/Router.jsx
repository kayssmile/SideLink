import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const LayoutMain = lazy(() => import('src/components/main/layout/layoutmain'));

const Home = lazy(() => import('src/components/main/home'));
const Board = lazy(() => import('src/components/main/board'));
const Instruction = lazy(() => import('src/components/main/instruction'));
const Error = lazy(() => import('src/components/main/error'));

const Login = lazy(() => import('src/components/main/forms/login'));
const Registration = lazy(() => import('src/components/main/forms/registration'));

const About = lazy(() => import('src/components/main/info/about'));
const Legal = lazy(() => import('src/components/main/info/legal'));

/*
Dashboard
*/
const LayoutFull = lazy(() => import('src/components/dashboard/layout/layoutfull'));
const Dashboard = lazy(() => import('src/components/dashboard/dashboard'));
const Offers = lazy(() => import('src/components/dashboard/offers'));
const PublicProfile = lazy(() => import('src/components/dashboard/PublicProfile'));
const Account = lazy(() => import('src/components/dashboard/Account'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      { index: true, element: <Navigate to="/home" /> }, // Root leitet auf Home um
      { path: 'home', element: <Home /> },
      { path: 'board', element: <Board /> },
      { path: 'instruction', element: <Instruction /> },
      { path: 'about', element: <About /> },
      { path: 'legal', element: <Legal /> },
      { path: 'login', element: <Login /> },
      { path: 'registration', element: <Registration /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> }, // Alle unbekannten Routen leiten auf 404
    ],
  },
  {
    path: '/dashboard',
    element: <LayoutFull />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'offers', element: <Offers /> },
      { path: 'publicprofile', element: <PublicProfile /> },
      { path: 'account', element: <Account /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> }, // Alle unbekannten Routen leiten auf 404
    ],
  },
]);

export default router;

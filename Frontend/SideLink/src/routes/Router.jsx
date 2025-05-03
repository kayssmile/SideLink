import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import RouterGuard from 'src/routes/RouterGuard';

const LayoutMain = lazy(() => import('src/components/main/layout/layoutmain'));

const Home = lazy(() => import('src/components/main/home/home'));
const Board = lazy(() => import('src/components/main/board/board'));
const Instruction = lazy(() => import('src/components/main/instruction'));
const Error = lazy(() => import('src/components/main/error'));

const Login = lazy(() => import('src/components/main/authentication/login'));
const Registration = lazy(() => import('src/components/main/authentication/registration'));

const About = lazy(() => import('src/components/main/info/about'));
const Legal = lazy(() => import('src/components/main/info/legal'));
const AGB = lazy(() => import('src/components/main/info/agb'));

/*
Dashboard
*/
const LayoutFull = lazy(() => import('src/components/dashboard/layout/LayoutFull'));
const Dashboard = lazy(() => import('src/components/dashboard/dashboard'));
//const Offers = lazy(() => import('src/components/dashboard/offers'));
const ServiceManagerOffer = lazy(() => import('src/components/dashboard/servicemanager/ServiceManagerOffer'));
const ServiceManagerSearch = lazy(() => import('src/components/dashboard/servicemanager/ServiceManagerSearch'));

const PublicProfile = lazy(() => import('src/components/dashboard/publicprofile/PublicProfile'));
const Account = lazy(() => import('src/components/dashboard/account/Account'));

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
      { path: 'Agb', element: <AGB /> },
      { path: 'login', element: <Login /> },
      { path: 'registration', element: <Registration /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> }, // Alle unbekannten Routen leiten auf 404
    ],
  },
  {
    path: '/dashboard',
    element: (
      <RouterGuard>
        <LayoutFull />
      </RouterGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      // { index: true, element: <Navigate to="/login" /> },
      { path: 'services-search', element: <ServiceManagerSearch /> },
      { path: 'services-offer', element: <ServiceManagerOffer /> },
      { path: 'publicprofile', element: <PublicProfile /> },
      { path: 'account', element: <Account /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> }, // Alle unbekannten Routen leiten auf 404
    ],
  },
]);

export default router;

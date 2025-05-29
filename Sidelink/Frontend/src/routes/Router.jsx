import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import RouterGuard from 'src/routes/RouterGuard';

/* Main */
const LayoutMain = lazy(() => import('src/components/main/layout/LayoutMain'));
const Home = lazy(() => import('src/components/main/home/Home'));
const Board = lazy(() => import('src/components/main/board/Board'));
const ServiceWithProfile = lazy(() => import('src/components/main/board/detail/ServiceWithProfile'));
const Instruction = lazy(() => import('src/components/main/info/Instruction'));
const Error = lazy(() => import('src/components/main/info/Error'));
const Login = lazy(() => import('src/components/main/authentication/Login'));
const Registration = lazy(() => import('src/components/main/authentication/Registration'));
const PasswordForgot = lazy(() => import('src/components/main/authentication/PasswordForgot'));
const PasswordReset = lazy(() => import('src/components/main/authentication/PasswordReset'));
const DataPrivacy = lazy(() => import('src/components/main/info/legal/DataPrivacy'));
const Imprint = lazy(() => import('src/components/main/info/legal/Imprint'));
const AGB = lazy(() => import('src/components/main/info/legal/AGB'));
const Contact = lazy(() => import('src/components/main/Contact'));

/* Dashboard */
const LayoutFull = lazy(() => import('src/components/dashboard/layout/LayoutFull'));
const Dashboard = lazy(() => import('src/components/dashboard/Dashboard'));
const ServiceManagerOffer = lazy(() => import('src/components/dashboard/servicemanager/ServiceManagerOffer'));
const ServiceManagerSearch = lazy(() => import('src/components/dashboard/servicemanager/ServiceManagerSearch'));
const PublicProfile = lazy(() => import('src/components/dashboard/publicprofile/PublicProfile'));
const Account = lazy(() => import('src/components/dashboard/account/Account'));
const Analytics = lazy(() => import('src/components/dashboard/analytics/Analytics'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: 'home', element: <Home /> },
      { path: 'board', element: <Board /> },
      {
        path: 'service-profile/:id',
        element: (
          <RouterGuard>
            <ServiceWithProfile />
          </RouterGuard>
        ),
      },
      { path: 'instructions', element: <Instruction /> },
      { path: 'contact', element: <Contact /> },
      { path: 'data-privacy', element: <DataPrivacy /> },
      { path: 'imprint', element: <Imprint /> },
      { path: 'agb', element: <AGB /> },
      { path: 'login', element: <Login /> },
      { path: 'registration', element: <Registration /> },
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/password-forgot',
    element: <PasswordForgot />,
  },
  {
    path: '/password-reset/:uid/:token',
    element: <PasswordReset />,
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
      { path: 'services-search', element: <ServiceManagerSearch /> },
      { path: 'services-offer', element: <ServiceManagerOffer /> },
      { path: 'publicprofile', element: <PublicProfile /> },
      { path: 'account', element: <Account /> },
      { path: 'analytics', element: <Analytics /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
]);

export default router;

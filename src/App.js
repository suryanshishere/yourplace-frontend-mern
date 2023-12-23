import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RootLayout from './RootLayout';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
// import NewPlace from './places/pages/NewPlace';
// import Users from './user/pages/Users';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { UIContextProvider } from './shared/context/ui-context';
import { useAuth } from './shared/hooks/auth-hook';

const Users = React.lazy(() => import('./user/pages/Users'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));

function App() {

  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = [
      { index: true, element: <Users /> },
      {
        path: "places",
        children: [
          { path: "new", element: <NewPlace /> },
          { path: ":placeId", element: <UpdatePlace /> },
        ],
      },
      // { path: "auth", element: <Auth /> },
      { path: ":userId/places", element: <UserPlaces /> },
      { path: "*", element: <Navigate to="/" /> },
    ];
  } else {
    routes = [
      { index: true, element: <Users /> },
      { path: ":userId/places", element: <UserPlaces /> },
      { path: "auth", element: <Auth /> },
      { path: "*", element: <Navigate to="/" /> },
    ];
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: routes,
    },
  ]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >

      <UIContextProvider>
        <RouterProvider router={router} />
      </UIContextProvider>

    </AuthContext.Provider>
  );
}

function AppWithSuspense() {
  return (
    <Suspense
      fallback={
        <div className='center'>
          <LoadingSpinner />
        </div>
      }
    >
      <App />
    </Suspense>
  );
}

export default AppWithSuspense;

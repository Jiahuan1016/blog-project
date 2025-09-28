import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import ProtectedHome from './ProtectedHome';
import ArticleList from './ArticleList';
import ArticleDetail from './ArticleDetail';
import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import Login from './Login';
import Register from './Register'; 
import MyProfile from './MyProfile';


const isLoggedIn = () => !!localStorage.getItem('token');

function RequireLogin({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedHome />,
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/articles/:id',
    element: (
      <RequireLogin>
        <ArticleDetail />
      </RequireLogin>
    ),
  },
  {
  path: '/profile',
  element: (
    <RequireLogin>
      <MyProfile />
    </RequireLogin>
  ),
},
  {
    path: '/create',
    element: (
      <RequireLogin>
        <CreateArticle />
      </RequireLogin>
    ),
  },
  {
    path: '/edit/:id',
    element: (
      <RequireLogin>
        <EditArticle />
      </RequireLogin>
    ),
  },
  { path: '*', element: <h2 style={{ padding: '2rem' }}>404 - Page Not Found</h2> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

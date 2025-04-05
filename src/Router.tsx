import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login        from './pages/Login';
import App          from './App';
import Daily        from './pages/Daily';
import Appointments from './pages/Appointments';
import Schedule     from './pages/Schedule';
import Logout       from './components/Logout';

// Routes
const DAILY           = '/fadebook/';
const APPOINTMENTS    = '/fadebook/appointments';
const SCHEDULE        = '/fadebook/schedule';
const LOGIN           = '/fadebook/login';
const LOGOUT          = '/fadebook/logout';


const router = createBrowserRouter([
  {
    path: DAILY,
    element:
      <App>
        <Daily />
      </App>
  },
  {
    path: APPOINTMENTS,
    element:
      <App>
        <Appointments />
      </App>
  },
  {
    path: SCHEDULE,
    element:
      <App>
        <Schedule />
      </App>
  },
  {
    path: LOGIN,
    element:
      <App>
        <Login />
      </App>
  }
]);


const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router;

export {
  DAILY,
  APPOINTMENTS,
  SCHEDULE,
  LOGIN,
  LOGOUT,
}
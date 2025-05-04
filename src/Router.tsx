import { RouterProvider } from 'react-router-dom';
import Login        from './pages/Login';
import App          from './App';
import Daily        from './pages/Daily';
import Appointments from './pages/Appointments';
import Schedule     from './pages/Schedule';
import Settings     from './pages/Settings';
import { createHashRouter } from 'react-router-dom';
import Profile from './pages/Profile';

// Routes
// const DAILY           = '/fadebook/';
// const APPOINTMENTS    = '/fadebook/appointments';
// const SCHEDULE        = '/fadebook/schedule';
// const LOGIN           = '/fadebook/login';
// const LOGOUT          = '/fadebook/logout';
// const SETTINGS        = '/fadebook/settings';
const DAILY           = '/';
const APPOINTMENTS    = '/appointments';
const SCHEDULE        = '/schedule';
const LOGIN           = '/login';
const LOGOUT          = '/logout';
const SETTINGS        = '/settings';
const PROFILE          = '/profile';


const router = createHashRouter([
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
    path: SETTINGS,
    element:
      <App>
        <Settings />
      </App>
  },
  {
    path: PROFILE,
    element:
      <App>
        <Profile />
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
  SETTINGS,
  PROFILE
}
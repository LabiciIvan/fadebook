import { useEffect } from 'react';
import useAuthentication from './context/AuthenticationContext';
import { useLocation, useNavigate } from 'react-router';
import { getUser, getUserSettings } from './utilities/DatabaseMock';
import Navigation from './components/Navigation';
import { APPOINTMENTS, DAILY, LOGIN, PROFILE, SCHEDULE, SETTINGS } from './Router';
import { useError } from './context/ErrorContext';
import Error from './components/Error';
import { useSettings } from './context/SettingsContext';

const App = ({children} : {children: React.ReactNode}): React.ReactNode => {

  const { message }         = useError();

  const { user, login }     = useAuthentication();

  const location            = useLocation();

  const navigate            = useNavigate();

  const { storeSettings }   = useSettings();

  useEffect(() => {

    const fetchedUser = getUser();

    const settings = getUserSettings(fetchedUser.id);

    // Keep logging in the user if already in LocalStorage
    if (fetchedUser.id) {
      storeSettings(settings);
      login(fetchedUser);
    }

    if (user && location.pathname === LOGIN) {
      navigate(DAILY);
    }

    if (!user && (location.pathname === DAILY || location.pathname === APPOINTMENTS || location.pathname === SCHEDULE || location.pathname === SETTINGS || location.pathname === PROFILE)) {
      navigate(LOGIN);
    }

  }, []);

  if (user && location.pathname === LOGIN) {
    navigate(DAILY);
  } else if (!user && (location.pathname === DAILY || location.pathname === APPOINTMENTS || location.pathname === SCHEDULE || location.pathname === SETTINGS || location.pathname === PROFILE)) {
    navigate(LOGIN);
  }

  return (
    <>
    <Navigation logged={user ? true : false}/>
    {message && <Error message={message} />}
    {children}
    </>
  )
}

export default App;
import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { AuthenticatedUser, Service, User, UserSettings } from '../types/DefaultTypes';
import { insertAppointments, insertUser, insertUserSettings } from '../utilities/DatabaseMock';
import useAuthentication from '../context/AuthenticationContext';
import { DAILY } from '../Router';
import { testAppointments, testServices, testUserSettings } from '../utilities/TestData';
import { useSettings } from '../context/SettingsContext';

const Login = (): React.ReactNode => {

  const navigate = useNavigate();

  const { login } = useAuthentication();

  const { storeSettings } = useSettings();

  const loginUser = (userData: User): void => {

    const user: AuthenticatedUser = {
      id: userData.id,
      email: userData.email,
      image: userData.image,
      keepLogged: false,
    }

    const settings: UserSettings = testUserSettings.filter(setting => setting.user_id === userData.id && {...setting, services: testServices})[0];

    const date = new Date();

    login(user);

    insertUser(user);

    insertAppointments(testAppointments, date.getFullYear());

    insertUserSettings(settings, userData.id);

    storeSettings(settings);

    navigate(DAILY);
  }

  return (
    <div className='grid w-screen h-full sm:grid-cols-3 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-16 grid-rows-2 sm:grid-rows-10'>
      <LoginForm onSubmitForm={loginUser}/>
    </div>
  )
}

export default Login;
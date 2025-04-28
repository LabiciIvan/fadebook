import { useNavigate } from 'react-router';
import useAuthentication from '../context/AuthenticationContext';

import { APPLICATION_USER_STORAGE, removeLocalStorage } from '../utilities/DatabaseMock'

const Logout = (): React.ReactNode => {

  const { user, logout } = useAuthentication();

  const navigate = useNavigate();

  const logutUser = (): void => {
    logout();
    removeLocalStorage(APPLICATION_USER_STORAGE);
    navigate('/fadebook/login');
  }

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 shadow-xs w-fit h-fit p-2 border border-red-200 rounded'
      onClick={logutUser}
    >
      Logout
    </button>
  )
}

export default Logout;
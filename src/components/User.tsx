import { useState } from 'react';
import { useNavigate } from 'react-router';
import { APPLICATION_APPOINTMENT_STORAGE, APPLICATION_USER_STORAGE, removeLocalStorage, removeUserSettings } from '../utilities/DatabaseMock';
import { LOGIN, PROFILE, SETTINGS } from '../Router';
import useAuthentication from '../context/AuthenticationContext';

const User = (): React.ReactNode => {

  const [enableMenu, setEnableMenu] = useState<boolean>(false);

  const { user, logout } = useAuthentication();

  const navigate = useNavigate();

  const logutUser = (): void => {

    if (!user) return;

    const date = new Date();

    logout();

    removeLocalStorage(APPLICATION_USER_STORAGE);

    // removeTotalAppintmentsOnLogout();

    removeUserSettings(user.id);

    removeLocalStorage(APPLICATION_APPOINTMENT_STORAGE + '-' + date.getFullYear());

    navigate(LOGIN);
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setEnableMenu(() => true)}
    >
      <img src={user?.image} alt='User image' className='rounded-full bg-blue-900 border border-blue-400 h-15 w-15' onMouseLeave={() => setEnableMenu(false)}/>
        <div className={`absolute h-fit w-40 gap-y-3 pt-2 pb-2 shadow-md flex flex-col top-15 transition-[opacity] transition-[z] duration-150 ease-in right-0 ${ enableMenu ? 'opacity-100 z-2' : 'opacity-0 z-[-1]'} rounded text-xl font-light text-gray-800 bg-white`}
          onMouseLeave={() => setEnableMenu(false)}
          onMouseEnter={() => setEnableMenu(() => true)}
        >
          <div className='flex flex-row w-full ps-3 items-center hover:text-blue-500'  onClick={() => navigate(PROFILE)}>
            <i className='bi bi-person'/>
            <small className='ps-3 text-[15px]'>Profile</small>
          </div>

          <div className='flex flex-row w-full ps-3 items-center hover:text-blue-500' onClick={() => navigate(SETTINGS)}>
            <i className='bi bi-gear'/>
            <small className='ps-3 text-[15px]'>Settings</small>
          </div>

          <div className='flex flex-row w-full ps-3 items-center hover:text-blue-500' onClick={logutUser}>
            <i className='bi bi-door-closed'/>
            <small className='ps-3 text-[15px]'>Sign out</small>
          </div>

        </div>
    </div>
  )
}

export default User;
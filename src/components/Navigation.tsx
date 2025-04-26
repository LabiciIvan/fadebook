import { useNavigate } from 'react-router';
import { DAILY, APPOINTMENTS, SCHEDULE, LOGIN } from '../Router';
import { JSX, ReactElement, useState } from 'react';
import User from './User';

interface NavigationPropTypes {
  logged: boolean
}

const Navigation: React.FC<NavigationPropTypes> = ({logged}): React.ReactNode => {

  const DEFAULY_LINK_STYLE = 'text-gray-900 hover:text-black transition-colors duration-200 px-4 py-2 cursor-pointer w-40 flex justify-center';

  const [selectedLink, setSelectedLink] = useState<string>('Daily');

  const navigate = useNavigate();

  interface NavigationLink {
    className: string,
    name: string,
    onInteraction: () => void,
    onlyForLogged: boolean,
    element: JSX.Element|false,
    icon: ReactElement|null,
  }

  const NavigationLinks: NavigationLink[] = [
    {
      className: DEFAULY_LINK_STYLE,
      name: 'Daily',
      onInteraction: () => { navigate(DAILY); setSelectedLink(() => 'Daily')},
      onlyForLogged: true,
      element: false,
      icon: <i className='bi bi-calendar-day text-[20px]'/>
    },
    {
      className: DEFAULY_LINK_STYLE,
      name: 'Appointments',
      onInteraction: () => { navigate(APPOINTMENTS); setSelectedLink(() => 'Appointments')},
      onlyForLogged: true,
      element: false,
      icon: <i className='bi bi-calendar-check text-[20px]'/>
    },
    {
      className: DEFAULY_LINK_STYLE,
      name: 'Schedule',
      onInteraction: () => { navigate(SCHEDULE); setSelectedLink(() => 'Schedule')},
      onlyForLogged: true,
      element: false,
      icon: <i className='bi bi-calendar-week text-[20px]'/>
    },
    {
      className: DEFAULY_LINK_STYLE,
      name: 'Login',
      onInteraction: () => { navigate(LOGIN); },
      onlyForLogged: false,
      element: false,
      icon: null
    },
    {
      className: DEFAULY_LINK_STYLE,
      name: '',
      onInteraction: () => {},
      onlyForLogged: true,
      element: <User />,
      icon: null
    },
  ];


  return (
    <div className='w-screen flex flex-row justify-end items-center h-18  bg-white shadow-md'>
      {
        NavigationLinks.map(link =>
          logged === link.onlyForLogged &&
          <div className={link.className} onClick={link.onInteraction} key={link.name}>
            {
              (link.icon &&
                (selectedLink !== link.name) ? link.icon :
                  (
                    (link.icon && selectedLink === link.name) &&
                    <div className='flex flex-col justify-center items-center text-blue-500'>
                      {link.icon}
                      <small className='text-[16px] font-semibold'>{link.name}</small>
                    </div>
                  )
              )
            }
            {link.element && link.element}
          </div>
        )
      }
    </div>
  )
}

export default Navigation;
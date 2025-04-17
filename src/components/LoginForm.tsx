import { useState } from 'react';
import { testUsers } from '../utilities/TestData';
import { User } from '../types/DefaultTypes';
import BarberLogo from '../assets/barber.png';

interface LoginFormProps {
  onSubmitForm: (userData: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSubmitForm}): React.ReactNode => {

  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [passwordError, setPasswordError] = useState<string>('');

  const [temporaryUser, setTemporaryUser] = useState<User|null>(null);

  const LABEL_STYLE = 'block text-sm font-medium text-gray-700 dark:text-gray-300';

  const INPUT_STYLE = 'w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const quickPreLogging = (): void => {
    if (username.length === 0) return;

    // Check user exists
    const user: User = testUsers.filter(user => user.email === username.trim())[0];

    setTemporaryUser(() => (user ? user : null));
  }

  const submitLoginForm = (e: React.SyntheticEvent<HTMLFormElement>) => {
    // Prevent refresh after form submit
    e.preventDefault();

    setPasswordError(() => '');

    const sanitizedUsername = username.trim();
    const sanitizedPassword = username.trim();

    if (sanitizedUsername.length === 0 && sanitizedPassword.length === 0 && !temporaryUser) {
      return;
    }

    if (temporaryUser?.password !== password) {
      setPasswordError(() => 'Incorrect password!');
      return;
    }

    // Submit form
    onSubmitForm(temporaryUser);
  }

  return (
    <form
      className='sm:col-span-3 md:col-span-4 md:col-start-3 lg:col-span-4 lg:col-start-4 xl:col-span-4 xl:col-start-7 row-span-2  row-start-1 sm:row-start-4 sm:row-span-5 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center' 
      onSubmit={submitLoginForm} >

        <div className='w-full flex justify-center items-center mb-4'>
          <img src={BarberLogo} alt='Barber Logo' className='w-20 h-20 rounded-full shadow-xl'/>
          <h4 className='text-2xl text-blue-600 font-bold'>FadeBook</h4>
        </div>

        <div className="flex flex-col mb-10 w-full sm:w-100 md:w-80 md">
          <div className={`${temporaryUser ? 'flex flex-row w-full sm:w-100 md:w-80 md gap-5' : ''}`}>
            { temporaryUser ?
              <img src={temporaryUser.image} alt='User image' className='w-13 h-13 rounded-full border border-blue-400'/>
              :
              <label className={LABEL_STYLE} htmlFor='username'>Username</label>
            }
            <input
              className={`${INPUT_STYLE + (temporaryUser && ' border-white')}`}
              type='text'
              placeholder='Username/Email'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(() => e.target.value)
              }
              onKeyUp={quickPreLogging}
              value={username}
            />
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-100 md:w-80 mb-10">
          <label className={LABEL_STYLE} htmlFor='password'>Password</label>
          <input
            className={INPUT_STYLE}
            type='password'
            placeholder='Password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setPassword(() => e.target.value)
            }
            value={password}
          />
          <small className='text-red-500 w-full flex  justify-center '>{passwordError}</small>
        </div>

      <button className='w-full sm:w-100 md:w-80 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg shadow-md transition-all' type='submit'>Login</button>
    </form>
  )
}

export default LoginForm;
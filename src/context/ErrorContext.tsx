import { useState, createContext, useContext } from 'react';
import { ErrorInterface } from '../types/ContexTypes';

const ErrorContext = createContext<ErrorInterface>({
  message: undefined,
  newError: () => {}
});


const ErrorProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [message, setMessage] = useState<string[]|undefined>(undefined);

  const newError = (message: string[]|undefined) => {
    setMessage(() => message);
  }

  return (
    <ErrorContext.Provider value={{ message, newError }}>
      {children}
    </ErrorContext.Provider>
  )
}

const useError = (): ErrorInterface => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }

  return context;
}

export default ErrorProvider;

export {
  useError
}
import { useError } from "../context/ErrorContext";

const Error = ({message}:{message:string[]}): React.ReactNode => {

  const {newError} = useError();

  const closeErrorNotification = (): void => {
    newError(undefined);
  }

  return (
    <div className='block bg-red-100 text-red-800 border border-red-300 px-4 py-2 my-2 rounded-md text-sm font-medium shadow-sm'>
      <i className='bi bi-x-lg cursor-pointer hover:text-red-400' onClick={closeErrorNotification} />
      <div className='flex flex-col w-full mt-2'>
        { message.map(msg =>
          <span >{msg}</span>
        )}
      </div>
    </div>
  )
}

export default Error;
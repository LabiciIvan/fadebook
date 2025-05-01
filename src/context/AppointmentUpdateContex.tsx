import { createContext, useContext, useState } from 'react';
import { AppointmentUpdateInterface } from '../types/ContexTypes';

/**
 * React Context used to track whether appointment data has been updated.
 * Provides a boolean flag (`updated`) and a function (`triggerAppointmentsUpdate`)
 * to signal a re-fetch or state refresh of appointments.
 */
const AppointmentUpdateContex = createContext<AppointmentUpdateInterface>({
  updated: false,
  triggerAppointmentsUpdate: () => {}
});


const AppointmentUpdateProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [updated, setUpdate] = useState<boolean>(false);

  const triggerAppointmentsUpdate = (): void => {
    setUpdate(prev => !prev);
  }

  return (
    <AppointmentUpdateContex.Provider value={{ triggerAppointmentsUpdate, updated }}>
      { children }
    </AppointmentUpdateContex.Provider>
  )
}


const useAppointmentUpdate = (): AppointmentUpdateInterface => {
  const context = useContext(AppointmentUpdateContex);

  if (!context) {
    throw new Error('useAppointmentUpdate must be used withing an AppointmentUpdateProvider');
  }

  return context;
}


export default AppointmentUpdateProvider;

export {
  useAppointmentUpdate
}
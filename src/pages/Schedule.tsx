import { useEffect, useState } from 'react';
import Appointments from '../components/Appointments';
import Calendar from '../components/Calendar';
import { useCalendarSelectedDay } from '../context/CalendarSelectedDayContext';
import { convertToHumanMonth } from '../utilities/Algorithms';
import { StoredAppointments } from '../types/DefaultTypes';
import { getAppointmentsForSpecificYear } from '../utilities/DatabaseMock';
import {Appointment} from '../types/DefaultTypes'
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';

const Schedule = (): React.ReactNode => {

  const { triggerAppointmentsUpdate } = useAppointmentUpdate();

  const { day, year, month, isDaySelected, enableDaySelected } = useCalendarSelectedDay();

  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);

  useEffect(() => {

    if (isDaySelected) {
      const storedAppointments: StoredAppointments = getAppointmentsForSpecificYear(year);
      if (Object.keys(storedAppointments).length > 0) {
        setSelectedAppointments(() => storedAppointments[convertToHumanMonth(month)][day]);
      }
    }


  }, [isDaySelected, triggerAppointmentsUpdate]);

  const closeAppointmentView = (): void => {
    enableDaySelected(false);
  }

  return (
    <div className='schedule flex w-full h-full bg-white overflow-y-hidden'>
      <Calendar />
      <div className={`absolute top-0 right-0 transition-[width] duration-100 ease-linear ${isDaySelected ? 'w-full' : 'w-0'} h-full flex flex-col items-end overflow-y-hidden bg-black/20 backdrop-blur-sm`}>
        <div className={`relative top-0 transition:[width] delay-150 duration-200 ease-linear ${isDaySelected ? 'w-full md:w-xl lg:w-4xl xl:w-7xl' : 'w-0'} ease-linear h-full flex flex-col bg-white`}>
          <div className='w-full h-25 flex flex-row p-4 shadow-xl mb-3'>
            <i className='bi bi-backspace-reverse-fill text-2xl text-blue-500 hover:text-blue-700 cursor-pointer' onClick={closeAppointmentView} />
          </div>
          <Appointments appointments={selectedAppointments} day={day} year={year} month={convertToHumanMonth(month)} />
        </div>
      </div>
    </div>
  )
}

export default Schedule;
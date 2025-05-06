import { useEffect, useState } from 'react';
import { Appointment, StoredAppointments } from '../types/DefaultTypes';


import Appointments from '../components/Appointments';
import { getAppointmentsForSpecificYear } from '../utilities/DatabaseMock';
import { convertToHumanMonth } from '../utilities/Algorithms';
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';

const Daily = (): React.ReactNode => {

  const date  = new Date();

  const YEAR  = date.getFullYear();

  const MONTH = convertToHumanMonth(date.getMonth());

  const DAY   = date.getDate();

  const [enableSchedule, setEnableSchedule] = useState<boolean>(false);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { updated } = useAppointmentUpdate();


  useEffect(() => {;

    const storedAppointments:StoredAppointments = getAppointmentsForSpecificYear(YEAR);

    if (storedAppointments) {
      const todayAppointments: Appointment[] = storedAppointments[MONTH][DAY];
      setAppointments(() => todayAppointments);
    }

    if (enableSchedule) {
      setEnableSchedule(() => false);
    }
  }, [updated]);


  return (
    <div className="w-screen h-full flex flex-col items-center overflow-y-hidden">
      <Appointments
        appointments={appointments}
        year={YEAR}
        month={MONTH}
        day={DAY}
      />
    </div>
  )
}

export default Daily;
import { useEffect, useState } from 'react';
import MonthYearPicker from '../components/MonthYearPicker';
import { Appointment, StoredAppointments } from '../types/DefaultTypes';

import AppointmentsComponent from '../components/Appointments';
import { convertToHumanMonth } from '../utilities/Algorithms';
import { getAppointmentsForSpecificYear } from '../utilities/DatabaseMock';
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';
import DayPicker from '../components/DayPicker';

const Appointments = (): React.ReactNode => {

  const date = new Date();

  const [year, setYear] = useState<number>(date.getFullYear());

  const [month, setMonth] = useState<number>(date.getMonth());

  const [day, setDay] = useState<number>(date.getDate());

  const [selectedAppointments, setSelectedAppointments] = useState<Appointment[]>([]);

  const { updated } = useAppointmentUpdate();

  const monthChange = (direction: 'increment'|'decrement'): void => {
    if (direction === 'increment' && month > 10) {
      setMonth(() => 0);
      setYear(prev => prev + 1);
    } else if (direction === 'increment' && month < 11) {
      setMonth(prevMonth => prevMonth + 1);
    } else if (direction === 'decrement' && month < 1) {
      setMonth(() => 11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prevMonth => prevMonth - 1);
    }
  }

  const yearChange = (direction: 'increment'|'decrement'): void => {
    setYear(prevYear => (direction === 'increment' ? prevYear + 1 : prevYear - 1));
  }

  const dayChange = (direction: 'increment'|'decrement'): void => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    if (direction === 'increment' && day >= daysInMonth) {
      setDay(() => 1);
      monthChange('increment');
    } else if (direction === 'decrement' && day <= 1) {
      const previousMonthDays = new Date(year, month, 0).getDate();
      setDay(() => previousMonthDays);
      monthChange('decrement');
    } else {
      setDay(prevDay => (direction === 'increment' ? prevDay + 1 : prevDay - 1));
    }
  }

  useEffect(() => {
    const fetchedAppointments: StoredAppointments = getAppointmentsForSpecificYear(year);

    const appointments: Appointment[] = fetchedAppointments[convertToHumanMonth(month)][day];

    setSelectedAppointments(() => appointments);
  }, []);

  useEffect(() => {
    const fetchedAppointments: StoredAppointments = getAppointmentsForSpecificYear(year);

    if (!fetchedAppointments[convertToHumanMonth(month)]) {
      setSelectedAppointments(() => []);
    } else {
      const appointments: Appointment[] = fetchedAppointments[convertToHumanMonth(month)][day];
      setSelectedAppointments(() => appointments);
    }

  }, [year, month, day, updated]);

  return (
    <div className="w-screen h-full flex flex-col items-center overflow-y-hidden">
      <MonthYearPicker onMonthChange={monthChange} onYearChange={yearChange} month={month} year={year}/>
      <DayPicker day={day} onDayChange={dayChange}/>
      <AppointmentsComponent appointments={selectedAppointments} year={year} month={convertToHumanMonth(month)} day={day}/>
    </div>
  )
}

export default Appointments;
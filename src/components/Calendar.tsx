import { useEffect, useState } from 'react';
import { convertToHumanMonth, getDaysInMonth } from '../utilities/Algorithms';
import { StoredAppointments } from '../types/DefaultTypes';
import MonthYearPicker from './MonthYearPicker';
import { useCalendarSelectedDay } from '../context/CalendarSelectedDayContext';
import { getAppointmentsForSpecificYear } from '../utilities/DatabaseMock';
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';

const daysOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar = (): React.ReactNode => {

  const date = new Date();

  const [year, setYear] = useState<number>(date.getFullYear());

  const [month, setMonth] = useState<number>(date.getMonth());

  const [days ,setDays] = useState<any[]>([]);

  const [currentDay] = useState<number>(date.getDate());

  const [selectedDay] = useState<number|null>(null);

  const { setDateData, enableDaySelected } = useCalendarSelectedDay();

  const [countAppointmentsForEachDay, setCountAppointmentsForEachDay] = useState<number[]>([]);

  const { updated } = useAppointmentUpdate();

  useEffect(() => {
    setDays(() => getDaysInMonth(year, month));

    const storedAppointments: StoredAppointments = getAppointmentsForSpecificYear(year);

    const tempDaysNumber = getDaysInMonth(year, month);

    const countAppointmentsEachDay: number[] = tempDaysNumber.map(day => {
      if (Object.keys(storedAppointments).length > 0 && storedAppointments[convertToHumanMonth(month)][day]) {
        return storedAppointments[convertToHumanMonth(month)][day].length;
      }

      return 0;
    });

    setCountAppointmentsForEachDay(() => countAppointmentsEachDay);

  }, [month, year, selectedDay, updated]);

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

  const selectDayForAppointmentSchedule = (day: number): void => {
    setDateData(day, month, year);
    enableDaySelected(true);
  }

  return (
  <div className='flex flex-col w-full items-center align-between'>
    <MonthYearPicker onMonthChange={monthChange} onYearChange={yearChange} month={month} year={year} />

    <div className='grid max-w-6xl w-full grid-cols-7 gap-1 p-4 text-gray-600 mt-4'>
      {daysOfWeek.map((day) => (
        <div className='font-bold text-center text-blue-600' key={day}>{day}</div>
      ))}
      {days.map((day, index) => (
        <div key={index} className='h-10 w-10 md:h-15 md:w-15 lg:h-20 lg:w-20 xl:h-25 xl:w-25 rounded-full justify-self-center '>
          { day &&
            <div className={`
              relative w-full h-full
              flex justify-center items-center
              text-xl text-blue-600 cursor-pointer hover:bg-blue-500 transition-colors duration-100 ease-in hover:text-white rounded-full 
              ${(currentDay === day && year === date.getFullYear() && month === date.getMonth()) ? 'bg-blue-400 text-white' : ''}
              ${countAppointmentsForEachDay[index] > 0 && 'bg-blue-200'}`}
              onClick={() => selectDayForAppointmentSchedule(day)}
            >
              {day}
              {
                countAppointmentsForEachDay[index] > 0 &&
                <div className='absolute w-10 h-5 top-[-0.2em] left-7 text-[12px] md:w-15 md:h-7 md:top-[-0.4em] md:left-10 md:text-sm lg:w-15 lg:h-7 lg:top-1 lg:left-14 bg-orange-500 text-white rounded justify-evenly items-center flex '>
                  {countAppointmentsForEachDay[index]}
                  <i className='bi bi-calendar2-check-fill' />
                </div>
              }
            </div>
          }
        </div>
      ))}
    </div>
  </div>
  )

}

export default Calendar;
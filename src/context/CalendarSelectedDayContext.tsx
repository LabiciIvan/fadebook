import { createContext, useContext, useState } from 'react';
import { CalendarSelectedDayContextInterface } from '../types/ContexTypes';



const CalendarSelectedDayContext = createContext<CalendarSelectedDayContextInterface>({
  isDaySelected: false,
  day: 0,
  month: 0,
  year: 0,
  setDateData: () => {},
  enableDaySelected: () => {}
});

const CalendarSelectedDayProvider = ({children}:{children: React.ReactNode}): React.ReactNode => {

  const [day, setDay] = useState<number>(0);

  const [month, setMonth] = useState<number>(0);

  const [year, setYear] = useState<number>(0);

  const [isDaySelected, setIsDaySelected] = useState<boolean>(false);

  const setDateData= (day: number, month: number, year: number): void => {
    setDay(() => day);
    setMonth(() => month);
    setYear(() => year);
  }

  const enableDaySelected = (value: boolean): void => {
    setIsDaySelected(() => value);
  }

  return (
    <CalendarSelectedDayContext.Provider value={{ day, month, year, setDateData, isDaySelected, enableDaySelected }}>
      {children}
    </CalendarSelectedDayContext.Provider>
  )
}

const useCalendarSelectedDay = (): CalendarSelectedDayContextInterface => {

  const context = useContext(CalendarSelectedDayContext);

  if (!context) {
    throw new Error('useCalendarSelectedDay must be used within an CaledanrSelectedDayProvider');
  }

  return context;
}

export default CalendarSelectedDayProvider;

export {
  useCalendarSelectedDay
}
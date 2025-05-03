import { convertToHumanMonth } from '../utilities/Algorithms';

interface MonthYearPickerInterface {
  onMonthChange: (direction: 'increment'|'decrement') => void
  onYearChange: (direction: 'increment'|'decrement') => void,
  month: number,
  year: number,
}

const MonthYearPicker: React.FC<MonthYearPickerInterface> = ({onMonthChange, onYearChange, month, year}): React.ReactNode => {

  return (
    <div className='grid grid-cols-12 grid-rows-1 h-15 w-full mt-2 bg-gray-100'>

      <div className='col-start-3 col-span-1 self-center justify-self-center cursor-pointer text-blue-600 font-bold hover:text-[22px]' onClick={() => onYearChange('decrement')}>{year - 1}</div>

      <div className='col-start-6 col-span-2 grid grid-cols-6 text-blue-600'>
        <i className='bi bi-caret-left-fill cursor-pointer col-start-1 col-span-1 self-center justify-self-center' onClick={() => onMonthChange('decrement')}/>

        <div className='flex flex-col col-start-2 col-span-4 items-center'>
          <h4 className='font-semibold'>{year}</h4>
          <h4 className='font-semibold'>{convertToHumanMonth(month)}</h4>
        </div>

        <i className='bi bi-caret-right-fill cursor-pointer col-start-6 col-span-1 self-center justify-self-center' onClick={() => onMonthChange('increment')}/>
      </div>

      <div className='col-start-10 col-span-1 self-center justify-self-center cursor-pointer text-blue-600 font-bold hover:text-[22px]' onClick={() => onYearChange('increment')}>{year + 1}</div>
    </div>
  )
}

export default MonthYearPicker;
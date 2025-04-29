interface DayPickerInterface {
  onDayChange: (direction: 'increment'|'decrement') => void,
  day: number,
}

const DayPicker: React.FC<DayPickerInterface> = ({onDayChange, day}): React.ReactNode => {

  return (
    <div className='grid grid-cols-12 grid-rows-1 h-15 w-full mt-3'>
      <div className='col-start-6 col-span-2 grid grid-cols-6 text-blue-600'>
        <i className='bi bi-caret-left-fill bi bi-caret-left-fill cursor-pointer col-start-1 col-span-1 self-center justify-self-center' onClick={() => onDayChange('decrement')}/>

        <div className="flex flex-col col-start-2 col-span-4 items-center text-gray-700">
          <h4 className='text-3xl font-bold '>{day}</h4>
        </div>

        <i className='bi bi-caret-right-fill bi bi-caret-right-fill cursor-pointer col-start-6 col-span-1 self-center justify-self-center' onClick={() => onDayChange('increment')}/>
      </div>
    </div>
  )
}

export default DayPicker;
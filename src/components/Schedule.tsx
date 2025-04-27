import { useState } from 'react';
import { calculateAppointmentStopTime, formatToHumanReadableDuration, isAppointmentOverlapping } from '../utilities/Algorithms';
import { ALLOWED_ADJUSTMENTS, Appointment, DECREMENT_ADJUSTMENT, INCREMENT_ADJUSTMENT, MonthTypes, Service } from '../types/DefaultTypes';
import { addNewAppointment, updateAppointment } from '../utilities/DatabaseMock';
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';
import { useError } from '../context/ErrorContext';
import { useSettings } from '../context/SettingsContext';

interface ScheduleProps {
  appointments?: Appointment[],
  year: number,
  month: MonthTypes,
  day: number,
  withinComponent?: boolean,
  startAtTime?: string,
  onCloseSchedule?: () => void,
  useForUpdate?: {
    appointmentID: string,
    appointmentName: string,
    appointmentDuration: number,
    appointmentStartAt: string,
    appointmentStopAt: string,
    appointmentComment: string|undefined,
    appointmentPhone: string|undefined,
  }
}

const Schedule: React.FC<ScheduleProps> = ({appointments, year, month, day, withinComponent, startAtTime, onCloseSchedule, useForUpdate}): React.ReactNode => {

  const { triggerAppointmentsUpdate } = useAppointmentUpdate();

  const { settings } = useSettings();

  const { newError } = useError();

  const startAt: string = (startAtTime !== undefined ? startAtTime : useForUpdate !== undefined ? useForUpdate.appointmentStartAt :'6:00 AM');

  const [name, setName] = useState<string>(useForUpdate !== undefined ? useForUpdate.appointmentName : '');

  const [duration, setDuration] = useState<number>(useForUpdate !== undefined ? useForUpdate.appointmentDuration : 5);

  const [humanReadableDuration, setHumanReadableDuration] = useState<string>('');

  const [estimatedAppointmentStopTime, setEstimatedAppointmentStopTime] = useState<string>(useForUpdate !== undefined ? useForUpdate.appointmentStopAt : calculateAppointmentStopTime(startAt, 5));

  const [appointmentComment, setAppointmentComment] = useState<string>(useForUpdate !== undefined && useForUpdate.appointmentComment !== undefined ? useForUpdate.appointmentComment : '');

  const [appointmentPhone, setAppointmentPhone] = useState<string>(useForUpdate !== undefined && useForUpdate.appointmentPhone !== undefined? useForUpdate.appointmentPhone : '');

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const appointmentValidation = (): string[]|null => {

    const errors: string[] = [];

    if (name.trim().length === 0) {
      errors.push(`Appointment 'name' is required.`);
    }

    if (duration === 0) {
      errors.push(`Appointment 'duration' can't be 0.`);
    }
    
    return (errors.length > 0 ? errors : null);
  }


  const calculateAppointmentBoxPosition = (withinComponent: boolean): 'top'|'bottom'|undefined => {
    if (!withinComponent || !startAtTime) return undefined;

    const timeAndPeriod = startAtTime.split(' ', 2);

    const [time, period] = timeAndPeriod;

    const hour = parseInt(time.split(':', 2)[0]);

    return (period === 'PM' && hour > 4 && hour !== 12 ? 'bottom' : 'top');
  }


  const appointmentBoxSchedule = calculateAppointmentBoxPosition(!withinComponent ? false : true);

  const appointmentDuration = (adjustment: ALLOWED_ADJUSTMENTS, helperTime: number|undefined = undefined): void => {
    const newDuration = (helperTime ? helperTime : (adjustment === INCREMENT_ADJUSTMENT ? duration + 5 : (duration > 5 ? duration - 5 : 5)));

    setDuration(() => newDuration);
    setHumanReadableDuration(() => formatToHumanReadableDuration(newDuration));

    setEstimatedAppointmentStopTime(() => calculateAppointmentStopTime(startAt, newDuration));
  }

  const createAppointment = (): void => {

    const validationErrors = appointmentValidation();

    if (validationErrors) {
      newError(validationErrors);
      return
    } else {
      newError(undefined);
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      name: name,
      available: false,
      duration: duration,
      startAt: startAt,
      stopAt: calculateAppointmentStopTime(startAt, duration),
      comment: appointmentComment,
      phone: appointmentPhone,
    }

    const isOverlapping = isAppointmentOverlapping(appointment, (appointments ? appointments : []));

    if(onCloseSchedule) {onCloseSchedule();}

    if (!isOverlapping) {
      // Store the appointment for this specific date
      addNewAppointment(appointment, year, month, day);
      triggerAppointmentsUpdate();
      return;
    }

    newError([isOverlapping]);
  }

  const updateExistingAppointment = (): void => {

    if (!useForUpdate) return;

    const validationErrors = appointmentValidation();

    if (validationErrors) {
      newError(validationErrors);
      return
    } else {
      newError(undefined);
    }

    const appointment: Appointment = {
      id: useForUpdate?.appointmentID,
      name: name,
      available: false,
      duration: duration,
      startAt: startAt,
      stopAt: calculateAppointmentStopTime(startAt, duration),
      comment: appointmentComment,
      phone: appointmentPhone,
    }

    const isOverlapping = isAppointmentOverlapping(appointment, (appointments ? appointments : []));

    if(onCloseSchedule) {onCloseSchedule();}

    if (!isOverlapping) {
      updateAppointment(appointment, year, month, day);
      triggerAppointmentsUpdate();
      return;
    }

    newError([isOverlapping]);
  }

  return (
    <div className={`absolute pointer-events-auto ${appointmentBoxSchedule === 'top' ? 'top-1' : 'bottom-1'} bg-white w-150 flex flex-col shadow-md rounded ps-10 pe-10 pb-5 pt-5 ${withinComponent && 'left-20 z-100 p-4'}`} onClick={(e) => { e.stopPropagation(); }}>

      <i className='bi bi-x-lg absolute top-2 left-5 cursor-pointer text-blue-400 hover:text-blue-800 text-2xl'  onClick={(e) => { e.stopPropagation(); (onCloseSchedule && onCloseSchedule())}} />

      <span className={`w-5 h-5 bg-white absolute ${appointmentBoxSchedule === 'top' ? 'top-0' : 'bottom-0'} left-[-1em]`} style={{clipPath: 'polygon(70% 0%, 100% 0%, 100% 100%, 70% 100%, 0% 50%)'}}/>

      <div className='flex flex-row w-full justify-end mb-8 gap-3 items-center'>
        <span className='text-[18px] text-gray-600'>{startAt}</span>
        <span className='text-[18px] text-gray-600'>-</span>
        <span className='text-[18px] text-gray-600'>{estimatedAppointmentStopTime}</span>
        <i className='bi bi-clock-fill text-[18px] text-gray-500' />
      </div>

      <div className='flex flex-row gap-1 mb-8 w-full'>
        <div className='flex flex-col text-black gap-1 flex-1'>
          <span className='bg-gray-300 rounded text-white p-1 cursor-pointer hover:bg-blue-400 text-center' onClick={() => appointmentDuration('increment', 15)}>15 min</span>
          <span className='bg-gray-400 rounded text-white p-1 cursor-pointer hover:bg-blue-400 text-center' onClick={() => appointmentDuration('increment', 30)}>30 min</span>
          <span className='bg-gray-500 rounded text-white p-1 cursor-pointer hover:bg-blue-400 text-center' onClick={() => appointmentDuration('increment', 55)}>45 min</span>
          <span className='bg-gray-600 rounded text-white p-1 cursor-pointer hover:bg-blue-400 text-center' onClick={() => appointmentDuration('increment', 60)}>1 h</span>
        </div>

        <div className='flex flex-col flex-1 justify-center items-center'>
          <span className='text-[17px] text-gray-600 gap-2 flex mb-1'>
            Time
            <i className='bi bi-hourglass-split text-gray-500' />
          </span>

          <div className='flex flex-row items-center justify-space gap-2 text-[18px] text-blue-400' >
            <i className='bi bi-dash-circle-fill cursor-pointer  hover:text-blue-600' onClick={() => appointmentDuration(DECREMENT_ADJUSTMENT)} />
            <small className='text-lg'>{humanReadableDuration.length === 0 ? '5 min' : humanReadableDuration}</small>
            <i className='bi bi-plus-circle-fill cursor-pointer  hover:text-blue-600' onClick={() => appointmentDuration(INCREMENT_ADJUSTMENT)}/>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
          <div className=''>
            <select
              className='p-2 border rounded border-gray-300 mb-4 text-[17px] text-gray-800 w-full outline-gray-300 focus:outline-blue-400 cursor-pointer'
              onChange={(e) => {
                const selectedService = settings.services.find(service => service.name === e.target.value);
                if (selectedService && !selectedServices.some(service => service.name === selectedService.name)) {
                  setSelectedServices([...selectedServices, selectedService]);
                }
              }}
              defaultValue=''
            >
              <option value='' disabled>Select a service</option>
              {settings.services.map((service, index) => (
                <option key={index} value={service.name}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-wrap gap-2 w-full'>
            {selectedServices.map((service, index) => (
              <div
                key={index}
                className='flex items-center gap-2 bg-blue-100 text-blue-800 p-2 rounded-full border border-blue-300'
              >
                <span>{service.name} - ${service.price}</span>
                <i
                  className='bi bi-x-circle-fill text-red-500 cursor-pointer hover:text-red-700'
                  onClick={() => setSelectedServices(selectedServices.filter(s => s.name !== service.name))}
                />
              </div>
            ))}
          </div>
        </div>

      <div className='flex flex-row content-center items-center gap-1'>
        <span className='text-[15px] text-gray-600'>Name</span>
        <strong className='text-red-500 text-xl'>*</strong>
      </div>

      <input
        className='p-2 border rounded border-gray-300 mb-8 text-[17px] text-gray-800 w-full outline-gray-300 focus:outline-blue-400'
        type='text'
        id='appointment_name'
        placeholder='Appointment name'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(() => e.target.value)}
        value={name}
      />

      <div className='flex flex-row content-center items-center gap-1'>
        <span className='text-[15px] text-gray-600'>Additional comments</span>
      </div>

      <textarea
        className='p-2 border rounded border-gray-300 mb-8 w-full outline-gray-300 focus:outline-blue-400 text-gray-800 max-h-20 text-[16px]'
        placeholder='Comments...'
        style={{ resize: 'none' }}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAppointmentComment(() => e.target.value)}
        value={appointmentComment}
      />

      <div className='flex flex-row w-full items-center gap-2 mb-4'>
        <i className='bi bi-telephone-plus-fill text-gray-600 text-[17px]' />
        <input
          className='p-2 rounded border-b border-gray-300 text-[17px] text-gray-800 w-full outline-gray-300 focus:outline-blue-400'
          type='text'
          id='appointment_phone'
          placeholder='Phone number'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppointmentPhone(() => e.target.value)}
          value={appointmentPhone}
        />
      </div>

      {useForUpdate !== undefined ? (
        <button
          className='border border-green-600 bg-green-500 text-white text-lg p-2 mt-2 rounded cursor-pointer hover:bg-green-600'
          onClick={(e) => { updateExistingAppointment(); e.stopPropagation();}}
        >
          Update
        </button>
      ) : (
        <button
          className='border border-blue-600 bg-blue-500 text-white text-lg p-2 mt-2 rounded cursor-pointer hover:bg-blue-600'
          onClick={(e) => { createAppointment(); e.stopPropagation();}}
        >
          Confirm
        </button>
      )}
    </div>
  )
}

export default Schedule;
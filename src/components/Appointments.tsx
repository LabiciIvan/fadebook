import { useState } from 'react';
import Schedule from './Schedule';
import { useAppointmentUpdate } from '../context/AppointmentUpdateContex';
import { Appointment, MonthTypes } from '../types/DefaultTypes';
import { deleteAppointment } from '../utilities/DatabaseMock';
import { formatToHumanReadableDuration, generateAppointmentsTime } from '../utilities/Algorithms';

interface AppointmentsProps {
  appointments: Appointment[],
  year: number,
  month: MonthTypes,
  day: number,
}

const Appointments: React.FC<AppointmentsProps> = ({appointments, year, month, day}): React.ReactNode => {

  const { triggerAppointmentsUpdate } = useAppointmentUpdate();

  const [enableSchedule, setEnableSchedule] = useState<boolean>(false);

  const [enableForTime, setEnableForTime] = useState<string>('');

  // const [enableHelpHint, setEnableHelpHint] = useState<boolean>(false);

  const handleEnableSchedule = (time: string): void => {
    setEnableSchedule(() => true);
    setEnableForTime(() => time);
  }

  const handleAppointmentDelete = (appointmentID: string): void => {
    deleteAppointment(appointmentID, year, month, day);
    triggerAppointmentsUpdate();
  }

  const closeSchedule = (): void => {
    setEnableSchedule(() => false);
  }

  const timeSlots = generateAppointmentsTime();

  const occupiedSlots = new Set<string>();

  return (
    <div className='w-full flex flex-col overflow-y-scroll'>
      {timeSlots.map((slot, index) => {
        // Skip if this time slot is already taken by a previous appointment
        if (occupiedSlots.has(slot.time)) {
          return null;
        }

        const app = appointments && appointments.find(a => a.startAt === slot.time);

        if (app) {
          const rowsToSpan = app.duration / 5;

          // Add all spanned time slots to the occupied set
          for (let i = 0; i < rowsToSpan; i++) {
            const nextSlot = timeSlots[index + i]?.time;
            if (nextSlot) {
              occupiedSlots.add(nextSlot);
            }
          }

          return (
            <div
              key={index}
              className='ps-2 border-b bg-blue-400 flex flex-col text-white justify-around relative'
              style={{ height: `${rowsToSpan * 90}px` }}
              onDoubleClick={() => handleEnableSchedule(slot.time)}
              // onMouseEnter={() => setEnableHelpHint(() => true)}
              // onMouseLeave={() => setEnableHelpHint(() => false)}
            >
            {
              enableSchedule && enableForTime === slot.time &&
              <Schedule
                appointments={appointments}
                year={year}
                month={month}
                day={day}
                withinComponent={true}
                startAtTime={slot.time}
                onCloseSchedule={closeSchedule}
                useForUpdate={{
                  appointmentID: app.id,
                  appointmentName: app.name,
                  appointmentDuration: app.duration,
                  appointmentStartAt: app.startAt,
                  appointmentStopAt: app.stopAt,
                  appointmentComment: app.comment ? app.comment : undefined,
                  appointmentPhone: app.phone ? app.phone : undefined,
                }}
              />
            }
            {/* { enableHelpHint && !enableSchedule &&
              <div className='absolute top-[-0.5em] right-10 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded shadow-md'>
              Hint: Double click to edit.
              </div>
            } */}
              <div>
                <small>{app.startAt}</small>
              </div>

              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <div className='ps-4'>{app.name} - {formatToHumanReadableDuration(app.duration)}</div>
                  <div className='ps-4 '>
                    {
                      app.comment?.split('\n').map((comm, index) => <div key={index} className='ps-4 text-sm'>{comm}</div>)
                    }
                  </div>
                </div>
                <div className='pr-4'>
                  <i
                    className='bi bi-trash-fill text-red-400 hover:text-red-600 cursor-pointer text-xl'
                    onClick={(e) => {e.stopPropagation(); handleAppointmentDelete(app.id)}}
                  />
                </div>
              </div>

              <div>
                <small>{app.stopAt}</small>
              </div>
            </div>
          );
        }

        // Render free slot
        return (
          <div
            key={index}
            className='ps-2 pt-2 pb-2 border-b h-[90px] text-xs text-black hover:bg-blue-300 relative flex '
            onClick={() => handleEnableSchedule(slot.time)}
          >
            {slot.time}
            {
              enableSchedule && enableForTime === slot.time &&
              <Schedule
                appointments={appointments}
                year={year}
                month={month}
                day={day}
                withinComponent={true}
                startAtTime={slot.time}
                onCloseSchedule={closeSchedule}
                useForUpdate={undefined}
              />
            }
          </div>
        );
      })}
    </div>
  );
}

export default Appointments;
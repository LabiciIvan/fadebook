import { Appointment, AppointmentTime, MonthTypes } from '../types/DefaultTypes';


const generateAppointmentsTime = (): AppointmentTime[] => {

  const TOTAL_HOURS = 18    // Starting from 06:00 AM - 12:00 AM

  const TOTAL_MINUTES = 12  // Multiple of 5, 60/5 = 12

  const appointmentsTimes: AppointmentTime[] = [];

  for (let i = 0; i < TOTAL_HOURS; ++i) {

    let period = (i < 6 ? 'AM' : 'PM');

    for (let j = 0, minute = 0; j < TOTAL_MINUTES; ++j, minute += 5) {
      let minutes = (minute < 10 ? '0' : '') + minute;

      let hour = (i + 6 < 13 ?  i + 6 : i - 6);

      appointmentsTimes.push({
        time: hour + ':' + minutes + ' ' + period
      });
    }
  }

  return appointmentsTimes;
}

const isAppointmentOverlapping = (appointment: Appointment, appointments: Appointment[]): false|string => {
  if (appointments.length === 0) return false;

  let newStart = timeToMinutes(appointment.startAt);
  let newStop = timeToMinutes(appointment.stopAt);

  for (let app of appointments) {
      let existingStart = timeToMinutes(app.startAt);
      let existingStop = timeToMinutes(app.stopAt);

      if (app.id === appointment.id) {continue};
      // Check for overlap conditions
      if (
          (newStart >= existingStart && newStart < existingStop) ||
          (newStop > existingStart && newStop <= existingStop) ||
          (newStart <= existingStart && newStop >= existingStop)
      ) {
        console.log('app scheduling', appointment);
        console.log('app overlapping', app);
        // return true; // Conflict found
        return `'Appointment is overlapping with another appointment: '${app.name}', between: ${app.startAt} - ${app.stopAt}`; // Conflict found
      }
  }

  return false; // No conflict
}

const calculateAppointmentStopTime = (startTime: string, duration: number): string => {
  let [time, period] = startTime.split(' ');
  let [hour, minute] = time.split(':').map(Number);

  // Convert 12-hour format to 24-hour format for easier calculations
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  // Step 2: Add duration (in minutes)
  let totalMinutes = hour * 60 + minute + duration;

  // Step 3: Convert back to 12-hour format
  let newHour = Math.floor(totalMinutes / 60) % 24;
  let newMinute = totalMinutes % 60;
  let newPeriod = newHour >= 12 ? 'PM' : 'AM';

  // Adjust for 12-hour clock display
  newHour = newHour % 12 || 12; // Convert 0 or 12 to 12-hour format

  return `${newHour}:${newMinute.toString().padStart(2, '0')} ${newPeriod}`;
}

const timeToMinutes = (timeStr: string): number => {

    let [time, period] = timeStr.split(' ');
    let [hour, minute] = time.split(':').map(Number);

    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour * 60 + minute;
}

const convertToHumanMonth = (month: number): MonthTypes => {
  const months: {[key: number]: MonthTypes} = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };

  return months[month];
}

const sortAppointmentsByStartTime = (appointments: Appointment[]): Appointment[] => {
  return appointments.sort((a, b) => {
    const getTimeInMinutes = (time: string): number => {
      const [timePart, modifier] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      return hours * 60 + minutes;
    };

    return getTimeInMinutes(a.startAt) - getTimeInMinutes(b.startAt);
  });
}

const getDaysInMonth = (year: number, month: number): any[] => {
  const days: any[] = [];

  const date = new Date(year, month, 1);

  const firstDay = date.getDay();

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // All days from previous month will be null.
  for (let i = 0; i < firstDay; ++i) {
    days.push(null);
  }

  // Continue with days on next position in array.
  for (let i = 1; i < lastDay + 1; ++i) {
    days.push(i);
  }

  return days;
};


const formatToHumanReadableDuration = (timeInMinutes: number): string => {
  let durationInMinutes: number = timeInMinutes;

  let durationInHours: number = 0;

  while (durationInMinutes > 59) {
    durationInMinutes -= 60;
    durationInHours++;
  }

  return ((durationInHours > 0 ? durationInHours + 'h ' : '') + (durationInMinutes > 0 ? durationInMinutes  + ' min' : ''));
}

export {
  generateAppointmentsTime,
  isAppointmentOverlapping,
  calculateAppointmentStopTime,
  convertToHumanMonth,
  sortAppointmentsByStartTime,
  getDaysInMonth,
  formatToHumanReadableDuration
}
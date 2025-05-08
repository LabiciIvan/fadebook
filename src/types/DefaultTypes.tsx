interface User {
  id: string,
  name: string,
  email: string,
  image: string,
  password: string,
}

interface AuthenticatedUser {
  id: string,
  email: string,
  keepLogged: boolean,
  image: string,
}

interface Appointment {
  id: string,
  name: string,
  comment?: string
  phone?: string
  available: boolean,
  duration: number,
  startAt: string,
  stopAt: string
}

interface AppointmentTime {
  time: string
}

type MonthTypes = 'January'|'February'|'March'|'April'|'May'|'June'|'July'|'August'|'September'|'October'|'November'|'December';

type StoredAppointments = {
  [month in MonthTypes]: {
    [day: string]: Appointment[];
  }
}

const INCREMENT_ADJUSTMENT = 'increment';
const DECREMENT_ADJUSTMENT = 'decrement';

type ALLOWED_ADJUSTMENTS = typeof INCREMENT_ADJUSTMENT | typeof DECREMENT_ADJUSTMENT;


interface Service {
  id: string,
  name: string,
  price: number,
  description?: string,
  image?: string,
}

interface UserSettings {
  user_id: string,
  services: Service[],
  holiday: boolean,
}


export type {
  User,
  MonthTypes,
  Appointment,
  AppointmentTime,
  AuthenticatedUser,
  StoredAppointments,
  ALLOWED_ADJUSTMENTS,
  Service,
  UserSettings,
}

export {
  INCREMENT_ADJUSTMENT,
  DECREMENT_ADJUSTMENT
}
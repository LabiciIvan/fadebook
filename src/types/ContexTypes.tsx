import { AuthenticatedUser } from './DefaultTypes'

interface AuthenticationType {
  user: AuthenticatedUser | null,
  login: (user: AuthenticatedUser) => void,
  logout: () => void,
}

interface AppointmentUpdateInterface {
  updated: boolean,
  triggerAppointmentsUpdate: () => void
}

interface ErrorInterface {
  message: string[]|undefined
  newError: (message: string[]|undefined) => void
}

interface CalendarSelectedDayContextInterface {
  isDaySelected: boolean,
  day: number,
  month: number,
  year: number
  setDateData: (day: number, month: number, year: number) => void,
  enableDaySelected: (value: boolean) => void
}

export type {
  AuthenticationType,
  AppointmentUpdateInterface,
  ErrorInterface,
  CalendarSelectedDayContextInterface
}
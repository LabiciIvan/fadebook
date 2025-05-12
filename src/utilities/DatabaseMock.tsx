import { Appointment, AuthenticatedUser, MonthTypes, StoredAppointments, UserSettings } from '../types/DefaultTypes';
import { convertToHumanMonth } from './Algorithms';

const APPLICATION_USER_STORAGE        = 'fadebook-user-storage';
const APPLICATION_APPOINTMENT_STORAGE = 'fadebook-data-storage';

const toLocalStorage = (keyName: string, data: string): void => {
  localStorage.setItem(keyName, data);
}

const removeLocalStorage = (keyName: string): void => {
  localStorage.removeItem(keyName);
}

const removeTotalAppintmentsOnLogout = (): void => {
  // Remove LocalStorage Appointments for this year.
  const FROM_YEAR = 2000;
  for (let i = 0; i < 100; ++i) {
    removeLocalStorage(APPLICATION_APPOINTMENT_STORAGE + '-' + (FROM_YEAR + i));
  }
}

const insertUser = (user: AuthenticatedUser): void => {
  toLocalStorage(APPLICATION_USER_STORAGE, JSON.stringify(user));
}

const getUser = (): AuthenticatedUser => {
  const data: string|null = localStorage.getItem(APPLICATION_USER_STORAGE);

  return JSON.parse(data ? data : "{}");
}

const insertAppointment = (appointments: Appointment[]): void => {
  toLocalStorage(APPLICATION_APPOINTMENT_STORAGE, JSON.stringify(appointments));
}

const getAppointmentsForSpecificYear = (year:number): StoredAppointments => {
  const appointments: string|null = localStorage.getItem(APPLICATION_APPOINTMENT_STORAGE + '-' + year);

  return JSON.parse(appointments ? appointments : "{}");
}

const insertAppointments = (appointments: StoredAppointments, year: number): void => {
  toLocalStorage(APPLICATION_APPOINTMENT_STORAGE + '-' + year, JSON.stringify(appointments));
}

const addNewAppointment = (appointment: Appointment, year: number, month: MonthTypes, day: number): void => {

  let existingAppointments = getAppointmentsForSpecificYear(year);

  // When creating a new appointment and there does not exist an appointment
  // we must create and store in localstorage first then insert the appointment.
  if (Object.keys(existingAppointments).length === 0) {
    let testData: any = {};

    for (let month = 0; month < 12; ++month) {
      testData[convertToHumanMonth(month)] = {};
    }

    insertAppointments(testData, year);
    existingAppointments = getAppointmentsForSpecificYear(year);
  }

  if (!existingAppointments[month][day]) {
    existingAppointments[month][day] = [];
    existingAppointments[month][day].push(appointment);
  } else {
    existingAppointments[month][day] = [...existingAppointments[month][day], appointment];
  }

  insertAppointments(existingAppointments, year);
}

const deleteAppointment = (appointmentID: string, year: number, month: MonthTypes, day: number): void => {
  const remainingAppointments = getAppointmentsForSpecificYear(year);

  remainingAppointments[month][day] = remainingAppointments[month][day].filter(appointment => appointment.id !== appointmentID);

  console.log('delete', remainingAppointments);

  insertAppointments(remainingAppointments, year);
}

const updateAppointment = (appointment: Appointment, year: number, month: MonthTypes, day: number): void => {
  const existingAppointments = getAppointmentsForSpecificYear(year);
  console.log('update appointment');

  existingAppointments[month][day] = existingAppointments[month][day].map(
    existingAppointment => (existingAppointment.id === appointment.id ? appointment : existingAppointment)
  );

  insertAppointments(existingAppointments, year);
}

const insertUserSettings = (userSettings: UserSettings, userID: string): void => {
  toLocalStorage('fadebook-user-settings-' + userID, JSON.stringify(userSettings));
}

const getUserSettings = (userID: string): UserSettings => {
  const data: string|null = localStorage.getItem('fadebook-user-settings-' + userID);

  return JSON.parse(data ? data : "{}");
}

const removeUserSettings = (userID: string): void => {
  removeLocalStorage('fadebook-user-settings-' + userID);
}


export {
  APPLICATION_USER_STORAGE,
  APPLICATION_APPOINTMENT_STORAGE,
  insertUser,
  insertAppointment,
  getUser,
  removeLocalStorage,
  getAppointmentsForSpecificYear,
  insertAppointments,
  addNewAppointment,
  deleteAppointment,
  updateAppointment,
  removeTotalAppintmentsOnLogout,
  insertUserSettings,
  removeUserSettings,
  getUserSettings
}
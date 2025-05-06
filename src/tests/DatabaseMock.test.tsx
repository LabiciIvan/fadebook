import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Appointment, AuthenticatedUser } from '../types/DefaultTypes';
import { APPLICATION_APPOINTMENT_STORAGE, APPLICATION_USER_STORAGE, insertUser } from '../utilities/DatabaseMock';

describe('DatabaseMock, Test 1:', () => {

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Test insertUser() method, to add a user in localStorage', () => {

    const mockUser: AuthenticatedUser = {
      id: crypto.randomUUID(),
      email: 'test@user.com',
      keepLogged: false,
      image: 'asda',
    }

    insertUser(mockUser);

    const jsonEncoded = JSON.stringify(mockUser);

    expect(localStorage.setItem).toHaveBeenCalledWith(APPLICATION_USER_STORAGE, jsonEncoded)
  });
})

describe('DatabaseMock, Test 2:', () => {

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  })

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Test () method, to add appointments array in localStorage', () => {

    const appointments: Appointment[] = [{
      id: crypto.randomUUID(),
      name: 'Haircut and beard trim.',
      available: false,
      startAt: '2023-10-01T09:00:00',
      stopAt: '2023-10-01T10:00:00',
      duration: 60,
    }];

    (appointments);

    const jsonEncoded = JSON.stringify(appointments);

    expect(localStorage.setItem).toHaveBeenCalledWith(APPLICATION_APPOINTMENT_STORAGE, jsonEncoded);
  })
})
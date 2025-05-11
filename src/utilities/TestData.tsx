import { Service, StoredAppointments, User, UserSettings } from '../types/DefaultTypes';

import JohnImage  from '../assets/john.png';
import BobImage   from '../assets/bob.png';
import MikeImage  from '../assets/mike.png';
import { convertToHumanMonth } from './Algorithms';

const createTestAppointments = (date: Date): StoredAppointments => {
  const testData: any = {};
  
  // Get current day of the current date.
  const day = date.getDate();

  for (let month = 0; month < 12; ++month) {
    testData[convertToHumanMonth(month)] = {};

    testData[convertToHumanMonth(month)][day] = [
      {
        id: crypto.randomUUID(),
        duration: 30,
        name: 'Fade & Blade Session',
        available: false,
        startAt: '7:20 AM',
        stopAt: '7:45 AM'
      },
      {
        id: crypto.randomUUID(),
        duration: 40,
        name: 'The Gentleman Trim',
        available: false,
        startAt: '12:00 PM',
        stopAt: '12:40 PM'
      },
      {
        id: crypto.randomUUID(),
        duration: 100,
        name: 'Beard & Buzz Appointment',
        available: false,
        startAt: '1:00 PM',
        stopAt: '2:40 PM'
      },
      {
        id: crypto.randomUUID(),
        duration: 35,
        name: 'Fresh Cut',
        available: false,
        startAt: '4:00 PM',
        stopAt: '4:35 PM'
      },
    ]
  }

  return testData;
}

const testUsers: User[] = [
  {
    id: '1qwe-aaaa-bbbb-cccc',
    name: 'John',
    email: 'john@mail.com',
    image: JohnImage,
    password: 'secret'
  },
  {
    id: '2qwe-aaaa-bbbb-cccc',
    name: 'Bob',
    email: 'bob@mail.com',
    image: BobImage,
    password: 'secret'
  },
  {
    id: '3qwe-aaaa-bbbb-cccc',
    name: 'Mike',
    email: 'mike@mail.com',
    image: MikeImage,
    password: 'secret'
  }
];

const testAppointments: StoredAppointments = createTestAppointments(new Date());

const testServices: Service[] = [
  {
    id: '1',
    name: 'Classic Haircut',
    price: 25,
    description: 'A traditional haircut tailored to your style and preference.',
    image: '/images/services/classic-haircut.jpg',
  },
  {
    id: '2',
    name: 'Beard Trim',
    price: 15,
    description: 'Clean up and shape your beard with clippers and scissors.',
    image: '/images/services/beard-trim.jpg',
  },
  {
    id: '3',
    name: 'Haircut & Beard Combo',
    price: 35,
    description: 'Full haircut and beard grooming for a complete look.',
    image: '/images/services/haircut-beard-combo.jpg',
  },
  {
    id: '4',
    name: 'Hot Towel Shave',
    price: 20,
    description: 'Traditional razor shave with a hot towel treatment.',
    image: '/images/services/hot-towel-shave.jpg',
  },
  {
    id: '5',
    name: 'Skin Fade',
    price: 30,
    description: 'Modern fade haircut with seamless blending to skin.',
    image: '/images/services/skin-fade.jpg',
  },
  {
    id: '6',
    name: 'Kids Haircut',
    price: 20,
    description: 'Haircut service tailored for children under 12.',
    image: '/images/services/kids-haircut.jpg',
  },
  {
    id: '7',
    name: 'Buzz Cut',
    price: 18,
    description: 'Even-length haircut with clippers all around.',
    image: '/images/services/buzz-cut.jpg',
  },
  {
    id: '8',
    name: 'Hair Wash & Scalp Massage',
    price: 10,
    description: 'Relaxing shampoo and scalp massage after a fresh cut.',
    image: '/images/services/scalp-massage.jpg',
  },
  {
    id: '9',
    name: 'Line Up / Shape Up',
    price: 12,
    description: 'Crisp edging and shaping around the hairline and beard.',
    image: '/images/services/line-up.jpg',
  },
  {
    id: '10',
    name: 'Eyebrow Trim',
    price: 8,
    description: 'Neat trim and clean-up of eyebrows with scissors or razor.',
    image: '/images/services/eyebrow-trim.jpg',
  },
];

const testUserSettings: UserSettings[] = [
  {
    user_id: '1qwe-aaaa-bbbb-cccc', // John
    services: testServices, 
    holiday: false,
  },
  {
    user_id: '2qwe-aaaa-bbbb-cccc', // Bob
    services: testServices, 
    holiday: false,
  },
  {
    user_id: '3qwe-aaaa-bbbb-cccc', // Mike
    services: testServices, 
    holiday: false,
  },
];


export {
  testUsers,
  testAppointments,
  testServices,
  testUserSettings
}


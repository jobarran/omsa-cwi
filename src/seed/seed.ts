import bcryptjs from 'bcryptjs';
import { UserPermission } from '@prisma/client'; // Import UserPermission enum

interface SeedUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
  legajo: string;
  phone: string;
  role: 'ADMIN' | 'PROJECT_MANAGER';
  permissions: UserPermission[]; // Change to an array of UserPermission enums
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'jbarrandeguy@obrasmetalicas.com.ar',
      name: 'Joaquin',
      lastName: 'Barrandeguy',
      legajo: '1234',
      phone: '1162933889',
      password: bcryptjs.hashSync('rebuscado13'),
      role: 'ADMIN',
      permissions: [UserPermission.TOTAL], // Provide permissions as an array of enum values
    },
  ],
};

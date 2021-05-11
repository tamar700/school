export class Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  registrationDate: Date;
  gender: Gender;
}

export enum Gender {
  Male,
  Female,
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  verification: { email: boolean };
  _id: string;
}

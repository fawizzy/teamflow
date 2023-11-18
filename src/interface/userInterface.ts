export interface userInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface loginInterface {
  email: string;
  password: string;
}

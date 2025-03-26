export interface User {
  id: string; // ObjectId do MongoDB é armazenado como string
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory user store (replace with DB in production)
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

let users: User[] = [];
let idCounter = 1;

export const UserRepository = {
  findByEmail: (email: string): User | undefined => {
    return users.find((u) => u.email === email);
  },

  findById: (id: string): User | undefined => {
    return users.find((u) => u.id === id);
  },

  create: (data: Omit<User, 'id' | 'createdAt'>): User => {
    const user: User = {
      id: String(idCounter++),
      ...data,
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  },
};

import User, { IUser } from '../models/User';

export const UserRepository = {
  findByEmail: async (email: string): Promise<IUser | null> => {
    return User.findOne({ email }).exec();
  },

  findById: async (id: string): Promise<IUser | null> => {
    return User.findById(id).exec();
  },

  create: async (data: {
    name: string;
    email: string;
    passwordHash: string;
    usertype: 'admin' | 'user';
  }): Promise<IUser> => {
    const newUser = new User(data);
    return newUser.save();
  },
};

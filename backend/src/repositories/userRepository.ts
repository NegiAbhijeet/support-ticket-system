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
  updateProfile: async (id: string, data: { title: string; description: string }): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, { $set: { title: data.title, description: data.description } }, { new: true });
  },
};

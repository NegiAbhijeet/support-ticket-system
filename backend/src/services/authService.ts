import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { config } from '../config';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    usertype: string;
  };
}

export const AuthService = {
  register: async (dto: RegisterDTO): Promise<AuthResult> => {
    console.log("inside auth service", dto)
    const existing = await UserRepository.findByEmail(dto.email);
    if (existing) {
      throw { status: 409, message: 'Email already in use' };
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await UserRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      usertype: 'user', // only 'user' type allowed via registration
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, usertype: user.usertype },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, usertype: user.usertype },
    };
  },

  login: async (dto: LoginDTO): Promise<AuthResult> => {
    const user = await UserRepository.findByEmail(dto.email);
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, usertype: user.usertype },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, usertype: user.usertype },
    };
  },
};

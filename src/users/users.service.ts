import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResponse } from './interfaces/user-responce.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto | null): Promise<UserResponse | null> {
    const user = await this.userRepository.save(createUserDto);
    return {
      success: true,
      result: {
        id: user.id,
      },
    }
  }

  async findAll(): Promise<UserResponse | null> {
    const users = await this.userRepository.find();
    return {
      success: true,
      result: {
        users: users,
      },
    };
  }

  async findOne(id: number): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        success: false,
        result: {
          error: 'User not found'
        }
      }
    }
    return {
      success: true,
      result: {
        users: user,
      },
    };
  }

  async findByRole(role: string): Promise<UserResponse | null> {
    const users = await this.userRepository.find({
      where: { role },
    });
    if (!users || users.length < 1) {
      return {
        success: false,
        result: {
          error: 'User not found'
        }
      }
    }
    return {
      success: true,
      result: {
        users: users,
      },
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse | null> {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        success: false,
        result: {
          error: 'User not found'
        }
      }
    }
    await this.userRepository.update(id, updateUserDto);
    user = await this.userRepository.findOneBy({ id });
    return {
      success: true,
      result: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        efficiency: user.efficiency
      },
    };
  }

  async remove(id: number): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return {
        success: false,
        result: {
          error: 'User not found'
        }
      }
    }
    await this.userRepository.remove(user);
    return {
      success: true,
      result: {
        id: id,
        full_name: user.full_name,
        role: user.role,
        efficiency: user.efficiency
      },
    };
  }

  async removeAll(): Promise<UserResponse | null> {
    const users = await this.userRepository.find();
    if (!users || users.length < 1) {
      return {
        success: false,
        result: {
          error: 'Users not found'
        }
      }
    }
    await this.userRepository.remove(users);
    return {
      success: true,
    };
  }
}

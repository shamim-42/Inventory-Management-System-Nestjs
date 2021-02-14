import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserLoginDTO, UserRegistrationDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // async showAll(page: number = 1) {
  //   const users = await this.userRepository.find({
  //     relations: ['ideas', 'bookmarks'],
  //     take: 25,
  //     skip: 25 * (page - 1),
  //   });
  //   return users.map(user => user.toResponseObject(false));
  // }

  async read(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
      relations: ['ideas', 'bookmarks'],
    });
    return user.toResponseObject(false);
  }

  async login(data: UserLoginDTO) {
    const { phone, password } = data;
    const user = await this.userRepository.findOne({ where: { phone } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserRegistrationDTO) {
    const { name, phone, password } = data;
    let user = await this.userRepository.findOne({ where: { phone } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async userShops(userId: Number){
    const allShopsOfThisUser = await this.userRepository.findOne({
      where: {
        id: userId
      },
      relations: ['shops']
    })
    return allShopsOfThisUser;
  }
}

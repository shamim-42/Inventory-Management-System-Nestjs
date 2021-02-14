import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '../shared/auth.gaurd';
import { UserService } from './user.service';
import { UserLoginDTO } from './user.dto';
import { UserRegistrationDTO } from './user.dto';

@Resolver('User')
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }


  @Query('user')
  async user(@Args('phone') phone: string) {
    return await this.userService.read(phone);
  }


    @Query('userShops')
    async userShopList(@Args('userId') userId: Number) {
      return await this.userService.userShops(userId);
    }


  @Query('user')
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { name } = user;
    return await this.userService.read(name);
  }

  @Mutation()
  async login(
    @Args('phone') phone: string,
    @Args('password') password: string,
  ) {
    const user: UserLoginDTO = { phone, password };
    return await this.userService.login(user);
  }

  @Mutation()
  async register(
    @Args('name') name: string,
    @Args('phone') phone: string,
    @Args('password') password: string,
  ) {
    const user: UserRegistrationDTO = { name, phone, password };
    return await this.userService.register(user);
  }


}

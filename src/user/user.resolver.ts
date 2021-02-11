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
import { CommentService } from '../comment/comment.service';
import { UserService } from './user.service';
import { UserLoginDTO } from './user.dto';
import { UserRegistrationDTO } from './user.dto';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) { }

  // @Query()
  // async users(@Args('page') page: number) {
  //   return await this.userService.showAll(page);
  // }

  @Query()
  async user(@Args('phone') phone: string) {
    return await this.userService.read(phone);
  }

  // @Query()
  // @UseGuards(new AuthGuard())
  // async whoami(@Context('user') user) {
  //   const { name } = user;
  //   return await this.userService.read(name);
  // }

  // @Mutation()
  // async login(
  //   @Args('phone') phone: string,
  //   @Args('password') password: string,
  // ) {
  //   const user: UserLoginDTO = { phone, password };
  //   return await this.userService.login(user);
  // }

  // @Mutation()
  // async register(
  //   @Args('name') name: string,
  //   @Args('phone') phone: string,
  //   @Args('password') password: string,
  // ) {
  //   const user: UserRegistrationDTO = { name, phone, password };
  //   return await this.userService.register(user);
  // }

  // @ResolveProperty()
  // async comments(@Parent() user) {
  //   const { id } = user;
  //   return await this.commentService.showByUser(id);
  // }
}

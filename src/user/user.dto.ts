import { IsNotEmpty } from 'class-validator';

export class UserLoginDTO {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
export class UserRegistrationDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: number;
  name: string;
  phone: string;
  email: string;
  created: Date;
  token?: string;
}

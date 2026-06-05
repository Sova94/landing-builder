import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email адрес' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль' })
  @IsString()
  password: string;
}

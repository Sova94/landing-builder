import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email адрес' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ description: 'Имя пользователя' })
  @IsString()
  @IsOptional()
  name?: string;
}

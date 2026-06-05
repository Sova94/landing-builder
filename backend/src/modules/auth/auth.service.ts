import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: User; accessToken: string }> {
    const { email, password, name } = registerDto;

    // Проверка существования пользователя
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    await this.userRepository.save(user);

    // Генерация токена
    const accessToken = this.generateToken(user.id);

    return { user, accessToken };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; accessToken: string }> {
    const { email, password } = loginDto;

    // Поиск пользователя
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверные учетные данные');
    }

    // Генерация токена
    const accessToken = this.generateToken(user.id);

    return { user, accessToken };
  }

  async validateUser(userId: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user || null;
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }
}

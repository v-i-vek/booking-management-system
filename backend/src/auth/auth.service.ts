import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // ─── Register ─────────────────────────────────────────────────────────────

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    // Check if email already in use
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default USER role
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    // Return user without password + access token
    const { password: _password, ...userWithoutPassword } = user;
    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Registration successful',
      user: userWithoutPassword,
      accessToken,
    };
  }

  // ─── Login ────────────────────────────────────────────────────────────────

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _password, ...userWithoutPassword } = user;
    const accessToken = this.generateToken(user.id, user.email, user.role);

    return {
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken,
    };
  }

  // ─── Get My Profile ───────────────────────────────────────────────────────

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // ─── Token Helper ─────────────────────────────────────────────────────────

  private generateToken(userId: string, email: string, role: string): string {
    const payload = { sub: userId, email, role };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '7d',
    });
  }
}

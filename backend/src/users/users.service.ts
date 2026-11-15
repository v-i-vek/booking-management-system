import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Find All Users (Admin only) ──────────────────────────────────────────

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      total: users.length,
      users,
    };
  }

  // ─── Find One User ────────────────────────────────────────────────────────

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  // ─── Update User ──────────────────────────────────────────────────────────

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    requestingUser: { id: string; role: string },
  ) {
    // Only admins can change roles or isActive; users can only update their own name
    const isAdmin = requestingUser.role === Role.ADMIN;
    const isSelf = requestingUser.id === id;

    if (!isAdmin && !isSelf) {
      throw new ForbiddenException('You can only update your own profile');
    }

    // Non-admin users cannot change roles or active status
    if (!isAdmin) {
      delete updateUserDto.role;
      delete updateUserDto.isActive;
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: 'User updated successfully',
      user: updated,
    };
  }

  // ─── Delete User (Admin only) ─────────────────────────────────────────────

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: `User "${user.name}" deleted successfully`,
    };
  }
}

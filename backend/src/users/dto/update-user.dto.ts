import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Full name', example: 'Jane Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'User role (Admin only)',
    enum: Role,
    example: Role.USER,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiPropertyOptional({
    description: 'Activate or deactivate the account (Admin only)',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

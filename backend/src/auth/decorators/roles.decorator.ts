import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';

export const ROLES_KEY = 'roles';

/**
 * @Roles() decorator — Marks a route as requiring specific roles.
 * Example: @Roles(Role.ADMIN) or @Roles(Role.ADMIN, Role.USER)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

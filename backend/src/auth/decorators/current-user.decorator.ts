import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @CurrentUser() decorator — Extracts the current authenticated user from the request.
 * Usage: @CurrentUser() user: User
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If a specific field is requested, return just that field
    return data ? user?.[data] : user;
  },
);

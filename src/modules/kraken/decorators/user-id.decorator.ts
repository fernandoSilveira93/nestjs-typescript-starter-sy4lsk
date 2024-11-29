import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('User ID is required in headers');
    }

    return userId;
  },
);
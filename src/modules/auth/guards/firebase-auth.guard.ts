import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const auth = getAuth();
      const userCredential = await signInWithCustomToken(auth, token);
      request.user = userCredential.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
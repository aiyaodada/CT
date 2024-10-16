import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) {}
}
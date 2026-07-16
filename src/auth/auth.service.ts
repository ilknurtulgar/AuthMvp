import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    //to communicate with the database
    constructor(private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, username, password } = registerDto;

        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            throw new ConflictException('this email address or username is already in use')
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await this.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
        };
    }

}

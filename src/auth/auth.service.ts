import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entities/user.entity';


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    async signJWT(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string) {
        try {
        const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });

        return {
            user,
            token: await this.signJWT(user as JwtPayload),
        };
        } catch (err) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    async registerUser(dto: RegisterUserDto) {
        const { sEmail, sPassword } = dto;

        const exists = await this.userRepository.findOneBy({ sEmail });
        if (exists) {
            throw new HttpException('El Usuario ya existe', HttpStatus.BAD_REQUEST);
        }

        const user = this.userRepository.create({
            sEmail,
            sPassword: bcrypt.hashSync(sPassword, 10),
        });
        const newUser = await this.userRepository.save(user);

        const { sPassword: _, ...rest } = newUser as any;
        const token = await this.signJWT({ sub: newUser.sIdUser, ...rest });

        return { user: rest, token };
    }

    async loginUser(dto: LoginUserDto) {
        const { sEmail, sPassword } = dto;

        const user = await this.userRepository.findOneBy({ sEmail });
        if (!user) {
            throw new HttpException('Usuario no válido', HttpStatus.BAD_REQUEST);
        }

        const valid = bcrypt.compareSync(sPassword, user.sPassword);
        if (!valid) {
            throw new HttpException('Password no válido', HttpStatus.BAD_REQUEST);
        }

        const { sPassword: _, ...rest } = user as any;
        const token = await this.signJWT({ sub: user.sIdUser, ...rest });

        return { user: rest, token };
    }
}

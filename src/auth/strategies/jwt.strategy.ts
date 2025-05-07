import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config/envs';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs.jwtSecret,
        });
    }

    // Este método se llama después de validar el token.
    // Lo que devuelva aquí será inyectado en request.user
    async validate(payload: JwtPayload) {
        return {
            sIdUser : payload.sIdUser,
            sEmail  : payload.sEmail
        };
    }
}

import { JwtModule } from '@nestjs/jwt';

export const JWT = JwtModule.register({
  secret: 'mysecret',
  signOptions: {
    expiresIn: 3600,
  },
});

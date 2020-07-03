import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { authCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: authCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: authCredentialsDto,
  ): Promise<{ userId: number; username: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return { userId: user.id, username: user.username };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

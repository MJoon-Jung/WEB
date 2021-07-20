import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { RegisterationData } from 'src/dto/register.request.dto';

dotenv.config();

@Injectable()
export class GithubService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async githubLogin(githubCode) {
    const { code } = githubCode;
    const getTokenUrl = 'https://github.com/login/oauth/access_token';
    const request = {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
    };
    const response: AxiosResponse = await axios.post(getTokenUrl, request, {
      headers: {
        accept: 'application/json', //json 요청
      },
    });

    if (response.data.error) {
      throw new HttpException(
        'Github authentication failed',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { access_token } = response.data;

    const getUserUrl = 'https://api.github.com/user';

    const { data } = await axios.get(getUserUrl, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { email, name } = data;

    const registeratonData: RegisterationData = {
      email,
      name,
      provider: 'github',
    };

    return this.usersRepository.save(registeratonData);
  }
}

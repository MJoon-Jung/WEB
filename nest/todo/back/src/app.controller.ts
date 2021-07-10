import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getone')
  getOne(@Query('id', ParseIntPipe) id: number): string {
    return this.appService.getOne(id);
  }
  @Post('setone')
  setOne(@Body() createUserDto: CreateUserDto): CreateUserDto[] {
    return this.appService.setOne(createUserDto);
  }

  @Get('getall/:id')
  getAll(@Param('id') id: string) {
    return this.appService.getAll(id);
  }
}

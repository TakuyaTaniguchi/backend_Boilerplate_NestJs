import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { IUser } from '../interfaces/users.interface';
import { UserService } from '../service/users.service';


@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  async getUsers() {
    return await this.UserService.find();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    try {
      return this.UserService.findCustomer(id);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  // curl -X POST -H "Content-Type: application/json" -d '{"id":101, "firstName":"hanako","lastName":"sato" }' http://localhost:3000/users/update
  @Post('update')
  updateUser(@Body() customer: IUser) {
    this.UserService.update({
      id: customer.id, //とりあえず
      firstName: customer.firstName,
      lastName: customer.lastName,
    });
  }

  // curl -X POST -H "Content-Type: application/json" -d '{"id":100,}' http://localhost:3000/users/remove
  @Post('remove')
  remove(@Body() id: number) {
    this.UserService.remove(id);
  }


  // curl -X POST -H "Content-Type: application/json" -d '{"id":101, "firstName":"hanako","lastName":"sato" }' http://localhost:3000/users/add
  @Post('add')
  addUser(@Body() customer: IUser) {
    // リクエストボディは直接 IUser の構造にマッピングされる
    this.UserService.add({
      firstName: customer.firstName,
      lastName: customer.lastName,
    });
  }
}

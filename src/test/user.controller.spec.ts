import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/users.controller';
import { UserService } from '../service/users.service';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  describe('getUser',()=>{
    // it('should return "Hello World!"', () => {
    //   const appController = app.get(UserController);
    //   expect(appController.getUser(1)).toBe('Hello World!');
    // });
  })

});

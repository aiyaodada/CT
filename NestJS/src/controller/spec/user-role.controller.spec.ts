import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from 'src/controller/user-role.controller';
import { UserRoleService } from 'src/service/user-role.service';

describe('UserRoleController', () => {
  let controller: UserRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [UserRoleService],
    }).compile();

    controller = module.get<UserRoleController>(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

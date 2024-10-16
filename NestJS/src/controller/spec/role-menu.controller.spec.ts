import { Test, TestingModule } from '@nestjs/testing';
import { RoleMenuController } from 'src/controller/role-menu.controller';
import { RoleMenuService } from 'src/service/role-menu.service';

describe('RoleMenuController', () => {
  let controller: RoleMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleMenuController],
      providers: [RoleMenuService],
    }).compile();

    controller = module.get<RoleMenuController>(RoleMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

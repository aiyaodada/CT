import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from 'src/controller/menu.controller';
import { MenuService } from 'src/service/menu.service';

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

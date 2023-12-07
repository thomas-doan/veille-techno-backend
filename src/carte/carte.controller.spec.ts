import { Test, TestingModule } from '@nestjs/testing';
import { CarteController } from './carte.controller';
import { CarteService } from './carte.service';

describe('CarteController', () => {
  let controller: CarteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarteController],
      providers: [CarteService],
    }).compile();

    controller = module.get<CarteController>(CarteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

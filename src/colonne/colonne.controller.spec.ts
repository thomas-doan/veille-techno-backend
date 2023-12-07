import { Test, TestingModule } from '@nestjs/testing';
import { ColonneController } from './colonne.controller';
import { ColonneService } from './colonne.service';

describe('ColonneController', () => {
  let controller: ColonneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColonneController],
      providers: [ColonneService],
    }).compile();

    controller = module.get<ColonneController>(ColonneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

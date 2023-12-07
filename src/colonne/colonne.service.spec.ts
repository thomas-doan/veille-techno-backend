import { Test, TestingModule } from '@nestjs/testing';
import { ColonneService } from './colonne.service';

describe('ColonneService', () => {
  let service: ColonneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColonneService],
    }).compile();

    service = module.get<ColonneService>(ColonneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

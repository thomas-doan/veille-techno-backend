import { Module } from '@nestjs/common';
import { ColonneService } from './colonne.service';
import { ColonneController } from './colonne.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [ColonneController],
  providers: [ColonneService, SharedModule],
  imports: [SharedModule]
})
export class ColonneModule {}

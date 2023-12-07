import { PartialType } from '@nestjs/mapped-types';
import { CreateColonneDto } from './create-colonne.dto';

export class UpdateColonneDto extends PartialType(CreateColonneDto) {}

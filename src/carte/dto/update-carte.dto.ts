import { PartialType } from '@nestjs/mapped-types';
import { CreateCarteDto } from './create-carte.dto';

export class UpdateCarteDto extends PartialType(CreateCarteDto) {}

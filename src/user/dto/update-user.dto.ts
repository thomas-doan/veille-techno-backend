import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @ApiProperty()
    password?: string;
  

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @ApiProperty()
    roleIdFk?: string;
}

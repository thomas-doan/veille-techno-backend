import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCarteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    titre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status : string;

    @ApiProperty()
    userIdFk?: string;

    @ApiProperty()
    colonneIdFk?: string
}

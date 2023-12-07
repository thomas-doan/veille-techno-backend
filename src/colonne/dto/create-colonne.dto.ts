import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColonneDto {

  @ApiProperty()
    @IsNotEmpty()
    @IsString()
    titre: string;

    userIdFk?: string;
}

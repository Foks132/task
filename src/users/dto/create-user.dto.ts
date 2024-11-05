import { IsInt, IsNotEmpty, Min, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(255)
    @Matches(/^[а-яА-Я\s]+$/u, {
        message: 'full_name must contain only russian letters and spaces',
      })
    full_name: string

    @IsNotEmpty()
    role: string

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    efficiency: number
}

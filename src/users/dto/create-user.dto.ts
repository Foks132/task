import { IsInt, IsNotEmpty, Min, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^[а-яА-ЯёЁa-zA-Z\s]+$/, {
    message: 'full_name must contain only russian or latin letters and spaces',
  })
  full_name: string;

  @IsNotEmpty()
  role: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  efficiency: number;
}

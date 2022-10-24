import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}

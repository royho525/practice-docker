import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @Type(() => Number)
  @IsInt()
  page!: number;

  @Type(() => Number)
  @IsInt()
  limit!: number;

  @IsOptional()
  name?: string;
}

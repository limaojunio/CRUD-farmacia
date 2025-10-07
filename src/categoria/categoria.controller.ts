import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Get('/tipo/:tipo')
  findByTipo(@Param('tipo') tipo: string): Promise<Categoria[]> {
    return this.categoriaService.findByTipo(tipo);
  }

  @Post()
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() categoria: Categoria,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.categoriaService.delete(id);
  }
}

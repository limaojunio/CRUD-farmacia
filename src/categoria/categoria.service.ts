import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }
    return categoria;
  }

  async findByTipo(tipo: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: {
        tipo: tipo,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.findById(id);
    categoria.id = categoriaExistente.id;
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }
  }
}

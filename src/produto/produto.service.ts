import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({ relations: ['categoria'] });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        nome: nome,
      },
      relations: ['categoria'],
    });
  }

  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(id: number, produto: Produto): Promise<Produto> {
    const produtoExistente = await this.findById(id);
    produto.id = produtoExistente.id;
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
  }
}

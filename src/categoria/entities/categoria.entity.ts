import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  tipo: string;

  @Column({ length: 1000, nullable: true })
  descricao: string;
}

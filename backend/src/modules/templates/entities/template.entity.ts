import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({ type: 'text' })
  preview: string;

  @Column({ type: 'jsonb' })
  project: Record<string, unknown>;

  @Column('text', { array: true })
  tags: string[];

  @Column({ default: 0 })
  usageCount: number;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ nullable: true })
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ProjectStatus } from '../enums/project-status.enum';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: {} })
  data: Record<string, unknown>;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status: ProjectStatus;

  @Column({ nullable: true })
  publishedUrl: string;

  @Column({ type: 'jsonb', default: {} })
  seo: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  analytics: Record<string, unknown>;

  @Column({ type: 'jsonb', default: {} })
  settings: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;
}

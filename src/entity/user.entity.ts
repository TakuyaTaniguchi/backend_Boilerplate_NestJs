import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn } from 'typeorm';
import { IUser } from '../interfaces/users.interface';
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' }) 
  firstName: string;

  @Column({ name: 'last_name' }) 
  lastName: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly updated_at: Date;
}

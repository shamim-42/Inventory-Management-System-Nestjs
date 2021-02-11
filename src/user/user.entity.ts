import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from 'typeorm';
import { UserRO } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 32, type: 'varchar' })
  phone: string;

  @Column({ length: 64, type: 'varchar' })
  email: string;

  @Column({ length: 64 })
  password: string;

  @CreateDateColumn()
  created: Date;

  ////////////////// Some essentials functions  ////////
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, name, token, phone, email } = this;
    const responseObject: UserRO = {
      id,
      created,
      name,
      phone,
      email
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, name } = this;

    return jwt.sign(
      {
        id,
        name,
      },
      process.env.SECRET,
      { expiresIn: '1d' },
    );
  }
}




// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   BeforeInsert,
//   OneToMany,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';

// import { IdeaEntity } from '../idea/idea.entity';
// import { UserRO } from './user.dto';

// @Entity('user')
// export class UserEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @CreateDateColumn()
//   created: Date;

//   @Column({
//     type: 'varchar',
//     length: 32,
//     unique: true,
//   })
//   username: string;

//   @Column({type: 'varchar', length: '32'})
//   password: string;

//   @OneToMany(type => IdeaEntity, idea => idea.author, { cascade: true })
//   ideas: IdeaEntity[];

//   @ManyToMany(type => IdeaEntity, { cascade: true })
//   @JoinTable()
//   bookmarks: IdeaEntity[];

//   @BeforeInsert()
//   async hashPassword() {
//     this.password = await bcrypt.hash(this.password, 10);
//   }

//   async comparePassword(attempt: string): Promise<boolean> {
//     return await bcrypt.compare(attempt, this.password);
//   }

//   toResponseObject(showToken: boolean = true): UserRO {
//     const { id, created, username, token } = this;
//     const responseObject: UserRO = {
//       id,
//       created,
//       username,
//     };

//     if (this.ideas) {
//       responseObject.ideas = this.ideas;
//     }

//     if (this.bookmarks) {
//       responseObject.bookmarks = this.bookmarks;
//     }

//     if (showToken) {
//       responseObject.token = token;
//     }

//     return responseObject;
//   }

//   private get token(): string {
//     const { id, username } = this;

//     return jwt.sign(
//       {
//         id,
//         username,
//       },
//       process.env.SECRET,
//       { expiresIn: '7d' },
//     );
//   }
// }

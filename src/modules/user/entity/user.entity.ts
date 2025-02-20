import { EntityNames } from "src/common/enum/entity-name.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity(EntityNames.User)
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id : number;
    @Column({nullable : true})
    first_name : string;
    @Column({nullable : true})
    last_name : string;
    @Column({unique : true})
    mobile : string;
    @Column({nullable : true , unique : true})
    email : string;
    @Column({unique: true, nullable: true})
    invite_code: string;
    @Column({default: 0})
    score: number;
    @Column({nullable: true})
    agentId: number;
    @CreateDateColumn()
    created_at : Date;
    @UpdateDateColumn()
    updated_at : Date;
}
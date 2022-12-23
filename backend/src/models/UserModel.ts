import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Contacts } from "./ContactModel";

@Table({
  timestamps: false,
  tableName: "users",
})
export class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "user",
  })
  profile!: string;

  @HasMany(() => Contacts)
  contacts: Contacts[];
}

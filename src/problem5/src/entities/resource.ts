import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { StatusEnum } from "../enums/status";

@Entity("resources")
@Index("resources_createdat_idx", ["createdAt"])
@Index("resources_status_idx", ["status"])
@Index("resources_updatedat_idx", ["updatedAt"])
export class Resource {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar", length: 256 })
  name!: string;

  @Column({ type: "varchar", nullable: true })
  description!: string | null;

  @Column({ type: "timestamp", default: () => "now()" })
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "now()" })
  updatedAt!: Date;

  @Column({ type: "varchar", length: 20, default: StatusEnum.Active })
  status!: string;

  @Column({ type: "varchar", nullable: true })
  value1!: string | null;

  @Column({ type: "boolean", nullable: true })
  value2!: boolean | null;

  @Column({ type: "integer", nullable: true })
  value3!: number | null;

  @Column({ type: "float", nullable: true })
  value4!: number | null;
}

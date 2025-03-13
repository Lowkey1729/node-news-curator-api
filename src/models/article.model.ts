import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { format } from "date-fns";
import slugify from "slugify";

@Table({
  tableName: "articles",
  modelName: "Article",
  timestamps: true,
})
class Article extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare views: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare clicks: number;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @BeforeCreate
  static generateSlug(instance: Article) {
    instance.slug = Article.createSlug(instance.title);
  }

  @BeforeUpdate
  static updateSlug(instance: Article) {
    if (instance.changed("title")) {
      instance.slug = Article.createSlug(instance.title);
    }
  }

  static createSlug(title: string): string {
    const timestamp = format(new Date(), "yyyyMMddHHmmssSSS");
    return `${slugify(title, { lower: true, strict: true })}-${timestamp}`;
  }
}

export default Article;

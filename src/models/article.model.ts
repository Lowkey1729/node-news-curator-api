import {Column, CreatedAt, DataType, Model, Table, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: 'articles',
    modelName: 'Article',
    timestamps: true,
})
class Article extends Model{
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
        allowNull: false,
    })
    declare slug: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare url: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare views: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare clicks: number;

    @CreatedAt
    declare createdAt: Date

    @UpdatedAt
    declare updatedAt: Date
}

export default Article
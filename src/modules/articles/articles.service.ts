import {injectable} from "tsyringe";
import {ServiceResponse} from "@app/shared/types";
import {Op} from "sequelize";
import Article from "@app/models/article.model";
import {createArticleDto} from "@app/modules/articles/schemas/create-article.schema";

@injectable()
export class ArticleService {
    constructor() {
    }

    async fetchArticles(data: any): Promise<ServiceResponse> {
        const {
            title,
            views,
            clicks,
            sort_by = "created_at",
            direction = "DESC",
            limit = 15,
            page = 1,
        } = data;

        const whereClause: any = {};

        if (title) whereClause.title = {[Op.like]: `${title}%`};
        if (views) whereClause.views = Number(views);
        if (clicks) whereClause.clicks = Number(clicks);

        const articles = await Article.findAndCountAll({
            where: whereClause,
            order: [[sort_by, direction]],
            limit: Number(limit),
            offset: (Number(page) - 1) * Number(limit),
        });


        return {
            success: true,
            message: 'Articles fetched successfully.',
            data: {
                data: articles.rows,
                total: articles.count,
                per_page: Number(limit),
                current_page: Number(page),
                total_pages: Math.ceil(articles.count / limit),
            }
        }
    }

    async fetchArticleById(id: number): Promise<ServiceResponse> {
        const article = await Article.findByPk(id);
        if (!article) {
            throw new Error("Article not found");
        }

        return {
            success: true,
            message: 'Article fetched successfully.',
            data: article.toJSON()
        }
    }

    async createArticle(data: createArticleDto): Promise<ServiceResponse> {
        await Article.create(data)

        return {
            success: true,
            message: 'Article created successfully.',
            data: []
        }
    }

    async updateArticle() {
    }

    async recordArticleClick() {
    }
}
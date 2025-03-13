import { injectable } from "tsyringe";
import { ServiceResponse } from "@app/shared/types";
import { Op, WhereOptions } from "sequelize";
import Article from "@app/models/article.model";
import { createArticleDto } from "@app/modules/articles/schemas/create-article.schema";
import { updateArticleDto } from "@app/modules/articles/schemas/update-article.schema";
import { NotFoundError } from "@app/shared/errors";
import { fetchArticlesDto } from "@app/modules/articles/schemas/fetch-articles.schema";

@injectable()
export class ArticleService {
  constructor() {}

  async fetchArticles(data: fetchArticlesDto): Promise<ServiceResponse> {
    const {
      title,
      views,
      clicks,
      sort_by = "created_at",
      direction = "desc",
      limit = 15,
      page = 1,
    } = data;

    const whereClause: WhereOptions = {};

    if (title) whereClause.title = { [Op.like]: `${title}%` };
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
      message: "Articles fetched successfully.",
      data: {
        data: articles.rows,
        total: articles.count,
        per_page: Number(limit),
        current_page: Number(page),
        total_pages: Math.ceil(articles.count / limit),
      },
    };
  }

  async fetchArticleById(id: number): Promise<ServiceResponse> {
    const article = await Article.findByPk(id);
    if (!article) throw new NotFoundError("Article not found");

    return {
      success: true,
      message: "Article fetched successfully.",
      data: article.toJSON(),
    };
  }

  async createArticle(data: createArticleDto): Promise<ServiceResponse> {
    await Article.create(data);

    return {
      success: true,
      message: "Article created successfully.",
      data: [],
    };
  }

  async updateArticle(
    id: number,
    data: updateArticleDto,
  ): Promise<ServiceResponse> {
    const article = await Article.findByPk(id);
    if (!article) throw new NotFoundError("Article not found");

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== null),
    );

    await article.update(filteredData);

    return {
      success: true,
      message: "Article updated successfully.",
      data: [],
    };
  }

  async recordArticleClick(id: number): Promise<ServiceResponse> {
    const article = await Article.findByPk(id);
    if (!article) throw new NotFoundError("Article not found");

    article.clicks = (article.clicks || 0) + 1;
    await article.save();

    return {
      success: true,
      message: "Click recorded successfully.",
      data: [],
    };
  }
}

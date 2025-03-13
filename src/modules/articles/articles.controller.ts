import { injectable } from "tsyringe";
import { ArticleService } from "@app/modules/articles/articles.service";
import { Request, Response } from "express";
import { successResponse } from "@app/shared/utils";
import { createArticleDto } from "@app/modules/articles/schemas/create-article.schema";
import { StatusCodes } from "http-status-codes";
import { updateArticleDto } from "@app/modules/articles/schemas/update-article.schema";

@injectable()
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  index = async (req: Request, res: Response) => {
    const data = await this.articleService.fetchArticles(req.query);

    successResponse({ res, data });
  };

  store = async (req: Request, res: Response) => {
    const data = await this.articleService.createArticle(
      req.body as createArticleDto,
    );

    successResponse({ res: res, data: data, statusCode: StatusCodes.CREATED });
  };

  update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await this.articleService.updateArticle(
      id,
      req.body as updateArticleDto,
    );

    successResponse({ res, data });
  };

  show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await this.articleService.fetchArticleById(id);

    successResponse({ res, data });
  };

  click = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await this.articleService.recordArticleClick(id);

    successResponse({ res, data });
  };
}

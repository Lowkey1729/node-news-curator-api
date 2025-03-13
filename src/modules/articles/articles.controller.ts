import {injectable} from "tsyringe";
import {ArticleService} from "@app/modules/articles/articles.service";
import {Request, Response} from "express";
import {successResponse} from "@app/shared/utils";
import {createArticleDto} from "@app/modules/articles/schemas/create-article.schema";
import {StatusCodes} from "http-status-codes";


@injectable()
export class ArticlesController {
    constructor(private readonly articleService: ArticleService) {}

    index = async (req: Request, res: Response) => {
        const data = await this.articleService.fetchArticles(req.query)

        successResponse({res, data})
    }

    store = async (req: Request, res: Response) => {
        const data = await this.articleService.createArticle(req.body as createArticleDto)

        successResponse({res: res, data: data, statusCode: StatusCodes.CREATED})
    }

    update = async (req: Request, res: Response) => {
        await this.articleService.updateArticle()

        successResponse({res})
    }

    show = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const data = await this.articleService.fetchArticleById(id)

        successResponse({res, data})
    }

    click = async (req: Request, res: Response) => {
        await this.articleService.recordArticleClick()

        successResponse({res})
    }
}
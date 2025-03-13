import { Router } from 'express'
import { container } from 'tsyringe'
import {ArticlesController} from "@app/modules/articles/articles.controller";
import {validate} from "@app/middlewares/validator.middleware";
import {createArticleSchema} from "@app/modules/articles/schemas/create-article.schema";

const router = Router()
const articlesController = container.resolve(ArticlesController)

router.get('/', articlesController.index)
router.post('/', validate(createArticleSchema), articlesController.store)
router.put('/:id', articlesController.update)
router.get('/:id', articlesController.show)
router.post('/:id/click', articlesController.click)

export { router as articleRouter }

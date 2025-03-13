import { Router } from 'express'
import { container } from 'tsyringe'
import {ArticlesController} from "@app/modules/articles/articles.controller";

const router = Router()
const articlesController = container.resolve(ArticlesController)

router.get('/', articlesController.index)
router.post('/', articlesController.store)
router.put('/:id', articlesController.update)
router.get('/:id', articlesController.show)
router.get('/:id/click', articlesController.click)

export { router as articleRouter }

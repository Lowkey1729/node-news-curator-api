import request from "supertest";
import sequelize from "@app/database/connection.database";
import Article from "@app/models/article.model";
import app from "../../../../server";

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

const updateArticle = () => ({
  title: "Updated Article Title",
  url: "https://updated-example.com",
  content: "This is an updated article.",
});

describe("Update Article API", () => {
  test("it returns error when an invalid id is given", async () => {
    const requestData = updateArticle();

    const article = await Article.create({
      title: "Original Title",
      url: "https://example.com",
      content: "Original content",
    });

    const response = await request(app)
      .put(`/api/v1/articles/${article.id + 1}`)
      .send(requestData);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      message: "Article not found",
    });
  });

  test("it successfully updates an article", async () => {
    const requestData = updateArticle();

    const article = await Article.create({
      title: "Original Title",
      url: "https://example.com",
      content: "Original content",
    });

    const response = await request(app)
      .put(`/api/v1/articles/${article.id}`)
      .send(requestData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      message: "Article updated successfully.",
    });
  });

  test("it has the slug changed after updating the title of an article", async () => {
    const requestData = updateArticle();

    const article = await Article.create({
      title: "Old Title",
      url: "https://example.com",
      content: "Original content",
    });

    const response = await request(app)
      .put(`/api/v1/articles/${article.id}`)
      .send(requestData);

    expect(response.status).toBe(200);

    const updatedArticle = await Article.findByPk(article.id);
    expect(updatedArticle?.slug).not.toBe(article.slug);
  });

  test("it does not change the slug when the title is not updated", async () => {
    const article = await Article.create({
      title: "Title",
      url: "https://example.com",
      content: "Content",
    });

    const response = await request(app)
      .put(`/api/v1/articles/${article.id}`)
      .send({ url: "https://facebook.com" });

    expect(response.status).toBe(200);

    const updatedArticle = await Article.findByPk(article.id);
    expect(updatedArticle?.slug).toBe(article.slug);
  });
});

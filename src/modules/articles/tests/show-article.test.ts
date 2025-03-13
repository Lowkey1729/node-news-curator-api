import request from "supertest";
import sequelize from "@app/database/connection.database";
import Article from "@app/models/article.model";
import app from "../../../../server";

describe("Fetch an Article API Tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("it returns an error response when an article is not found", async () => {
    const response = await request(app).get("/api/v1/articles/1");
    expect(response.status).toBe(404);

    expect(response.body).toMatchObject({
      success: false,
      message: "Article not found",
    });
  });

  test("it successfully returns details of an article", async () => {
    const article = await Article.create({
      title: "Test Article",
      slug: "test-article",
      content: "This is a test article.",
      url: "https://google.com",
    });

    const response = await request(app).get(`/api/v1/articles/${article.id}`);
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      success: true,
      message: "Article fetched successfully.",
      data: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        content: article.content,
      },
    });
  });
});

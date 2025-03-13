import sequelize from "@app/database/connection.database";
import request from "supertest";
import Article from "@app/models/article.model";
import app from "../../../../server";

describe("Create Article API", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }); // Clears data before each test
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("it validates request", async () => {
    const response = await request(app).post("/api/v1/articles").send({});

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      success: false,
      message: expect.any(String),
      errors: expect.any(Object),
    });
  });

  test("it creates article successfully", async () => {
    const requestData = {
      title: "Test Article",
      url: "https://google.com",
      content: "I am mojeed",
    };

    const response = await request(app)
      .post("/api/v1/articles")
      .send(requestData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      message: "Article created successfully.",
    });

    const article = await Article.findOne();
    expect(article).not.toBeNull();
    expect(article?.title).toBe(requestData.title);
    expect(article?.url).toBe(requestData.url);
  });
});

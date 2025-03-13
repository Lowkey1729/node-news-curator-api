import sequelize from "@app/database/connection.database";
import request from "supertest";
import Article from "@app/models/article.model";
import app from "../../../../server";

describe("Fetch Articles API", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test("it fetches all articles successfully", async () => {
        await Article.create({
            title: "Test Article",
            url: "https://example.com/test-article",
            content: "Test with me",
        });

        const response = await request(app).get("/api/v1/articles");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully."
        });
    });

    test("it applies a limit to articles", async () => {
        await Article.bulkCreate(
            Array.from({length: 3}, (_, i) => ({
                title: `Article ${i + 1}`,
                url: `https://example.com/article-${i + 1}`,
                content: `Test with me ${i + 1}`,
            })),
        );

        const response = await request(app).get("/api/v1/articles?limit=1");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully.",
        });

        expect(response.body.data.per_page).toBeLessThanOrEqual(23);
    });

    test("it filters articles by title", async () => {
        const title = "Specific Article";
        await Article.create({
            title: title,
            url: "https://example.com/specific-article",
            content: "Test with me",
        });

        const response = await request(app).get(`/api/v1/articles?title=${title}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully."
        });
        expect(response.body.data['data'][0].title).toBe(title);
    });

    test("it filters articles by number of views", async () => {
        const views = 5;
        await Article.create({
            title: "Popular Article",
            url: "https://example.com/popular",
            views: views,
            content: "Test with me",
        });

        const response = await request(app).get(`/api/v1/articles?views=${views}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully."
        });
        expect(response.body.data['data'][0].views).toBe(views);
    });

    test("it filters articles by number of clicks", async () => {
        const clicks = 100;
        const article = await Article.create({
            clicks,
            title: "Clicked Article",
            url: "https://example.com/clicked",
            content: "Clicked Article",
        });

        const response = await request(app).get(
            `/api/v1/articles?clicks=${clicks}`,
        );
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully."
        });
        expect(response.body.data['data'][0].clicks).toBe(article.clicks);
    });

    test("it paginates articles and fetches the correct page", async () => {
        await Article.bulkCreate(
            Array.from({length: 5}, (_, i) => ({
                title: `Article ${i + 1}`,
                url: `https://example.com/article-${i + 1}`,
                content: `Test with me ${i + 1}`,
            })),
        );

        const page = 2;
        const response = await request(app).get(`/api/v1/articles?page=${page}&limit=1`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            message: "Articles fetched successfully."
        });
        expect(response.body.data.current_page).toBe(page);
    });
});

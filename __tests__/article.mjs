import supertest from "supertest";
import { bootstrap } from "../src/app.mjs";
import { redisClient } from "../src/config/redis.mjs";
import { logger, mongoTransport } from "../src/utils/logger.mjs";
import { sequelize } from "../src/config/database.mjs";
import User from "../src/models/user.mjs";

let server, request, token, article;
const fakeUser = {
    username: "Leila",
    password: "123",
};

const fakeArticle = {
    title: "Article title",
    text: "Article test",
    image: "Article image",
};

beforeAll(async () => {
    server = await bootstrap();
    request = supertest(server);

    await request.post("/register").send(fakeUser);

    await User.update({ role: "ADMIN" }, { where: { username: fakeUser.username } })

    const response = await request.post("/api/login").send(fakeUser)
    console.log(response.body)
    token = response.body.accessToken
});

afterAll(async () => {
    await User.destroy({ where: { username: fakeUser.username } })
    // close HTTP server
    await new Promise((resolve) => server.close(resolve));
    // close Sequelize pool
    await sequelize.close();
    // close Redis client
    redisClient.disconnect();
    // clear logger
    logger.clear();
    logger.remove(mongoTransport);
});

describe("Article", () => {
    test("list article 401", async () => {
        const response = await request.get("/api/article");
        expect(response.statusCode).toBe(401);
    });
    test("list article 200", async () => {
        const response = await request
            .get("/api/article")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    test("create article", async () => {
        const response = await request
            .post("/api/article")
            .set("Authorization", `Bearer ${token}`)
            .send(fakeArticle);

        expect(response.statusCode).toBe(201);
        article = response.body;
        checkArticle(article);
    });

    test("get article", async () => {
        const response = await request
            .get("/api/article/" + article.id)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        checkArticle(response.body);
    });
});
function checkArticle(article) {
    expect(article.title).toBe(fakeArticle.title);
    expect(article.text).toBe(fakeArticle.text);
    expect(article.image).toBe(fakeArticle.image);
    expect(article).toHaveProperty("id");
}
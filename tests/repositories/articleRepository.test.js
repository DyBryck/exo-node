import assert from "node:assert/strict";
import test, { beforeEach, describe } from "node:test";
import { ArticleRepository } from "../../repositories/articleRepository.js";
import { UserRepository } from "../../repositories/userRepository.js";
import { resetDatabase, TEST_DB_FILE } from "../helpers/db.js";

beforeEach(() => {
  resetDatabase();
});

const articleRepositoryTest = await ArticleRepository.create(TEST_DB_FILE);
const userRepositoryTest = await UserRepository.create(TEST_DB_FILE);

describe("getAllArticles()", async () => {
  test("should return all articles", async () => {
    const user = await userRepositoryTest.create({
      name: "User",
      email: "user@mail.com",
    });
    const article1 = await articleRepositoryTest.create({
      title: "Title One",
      content: "Content One",
      user_id: 1,
    });
    const article2 = await articleRepositoryTest.create({
      title: "Title Two",
      content: "Content Two",
      user_id: 1,
    });

    const articles = await articleRepositoryTest.getAll();

    assert.ok(
      articles.length >= 2,
      "Il devrait y avoir au moins deux articles",
    );

    const foundArticle1 = articles.find((a) => a.id === article1.id);
    const foundArticle2 = articles.find((a) => a.id === article2.id);
    assert.strictEqual(foundArticle1.title, article1.title);
    assert.strictEqual(foundArticle1.content, article1.content);
    assert.strictEqual(foundArticle2.title, article2.title);
    assert.strictEqual(foundArticle2.content, article2.content);
  });
});

describe("getArticleById()", async () => {
  test("should return an article by ID", async () => {
    const user = await userRepositoryTest.create({
      name: "User Two",
      email: "user2@mail.com",
    });
    const testArticle = {
      title: "Test Title",
      content: "Test Content",
      user_id: 1,
    };
    const createdArticle = await articleRepositoryTest.create(testArticle);
    const fetchedArticle = await articleRepositoryTest.getById(
      createdArticle.id,
    );

    assert.deepStrictEqual(fetchedArticle, createdArticle);
  });

  test("should return null or undefined for non-existing article", async () => {
    const user = await articleRepositoryTest.getById(9999);
    assert.strictEqual(user, null || undefined);
  });
});

describe("createArticle()", async () => {
  test("should create a new article", async () => {
    const user = await userRepositoryTest.create({
      name: "Test user",
      email: "user@test.com",
    });

    const testArticle = {
      title: "Test Title",
      content: "Test Content",
      user_id: user.id,
    };

    const newArticle = await articleRepositoryTest.create(testArticle);

    assert.strictEqual(newArticle.title, testArticle.title);
    assert.strictEqual(newArticle.content, testArticle.content);
  });
});

describe("updateArticle()", async () => {
  test("should update an existing article", async () => {
    const user = await userRepositoryTest.create({
      name: "Test User",
      email: "testuser@example.com",
    });

    const testArticle = {
      title: "Test Title",
      content: "Test Content",
      user_id: user.id,
    };
    const createdArticle = await articleRepositoryTest.create(testArticle);

    const updatedData = {
      title: "Updated title",
      content: "Updated content",
    };

    const updatedArticle = await articleRepositoryTest.update(
      createdArticle.id,
      updatedData,
    );

    assert.strictEqual(updatedArticle.title, updatedData.title);
    assert.strictEqual(updatedArticle.content, updatedData.content);
  });

  test("should throw an error when updating a non-existing article", async () => {
    try {
      await articleRepositoryTest.update(9999, { name: "Should Fail" });
      assert.fail("Expected error not thrown");
    } catch (error) {
      assert.strictEqual(error.message, "Aucun article modifié.");
    }
  });
});

describe("deleteArticle()", async () => {
  test("should delete an existing article", async () => {
    const user = await userRepositoryTest.create({
      name: "Test User",
      email: "test@user.com",
    });

    const createdArticle = await articleRepositoryTest.create({
      title: "Test title",
      content: "Test content",
      user_id: user.id,
    });

    const deletedArticle = await articleRepositoryTest.delete(
      createdArticle.id,
    );

    assert.deepStrictEqual(deletedArticle, createdArticle);
    const fetchedArticle = await articleRepositoryTest.getById(
      createdArticle.id,
    );
    assert.strictEqual(fetchedArticle, null || undefined);
  });

  test("should return null when trying to delete a non-existing user", async () => {
    const deletedArticle = await articleRepositoryTest.delete(9999);
    assert.strictEqual(deletedArticle, null);
  });
});

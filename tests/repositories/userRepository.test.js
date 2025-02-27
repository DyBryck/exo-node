import assert from "node:assert/strict";
import test, { beforeEach, describe } from "node:test";
import { UserRepository } from "../../repositories/userRepository.js";
import { resetDatabase, TEST_DB_FILE } from "../helpers/db.js";

beforeEach(() => {
  resetDatabase();
});

describe("UserRepository", async () => {
  const userRepositoryTest = await UserRepository.create(TEST_DB_FILE);

  describe("findAll()", async () => {
    test("should return all users", async () => {
      const user1 = await userRepositoryTest.create({
        name: "User One",
        email: "user1@example.com",
      });
      const user2 = await userRepositoryTest.create({
        name: "User Two",
        email: "user2@example.com",
      });

      const users = await userRepositoryTest.findAll();

      assert.ok(
        users.length >= 2,
        "Il devrait y avoir au moins deux utilisateurs",
      );

      const foundUser1 = users.find((u) => u.id === user1.id);
      const foundUser2 = users.find((u) => u.id === user2.id);
      assert.strictEqual(foundUser1.name, user1.name);
      assert.strictEqual(foundUser2.email, user2.email);
    });
  });

  describe("findById()", async () => {
    test("should return a user by ID", async () => {
      const testUser = { name: "Test User", email: "testuser@example.com" };
      const createdUser = await userRepositoryTest.create(testUser);
      const fetchedUser = await userRepositoryTest.findById(createdUser.id);

      assert.deepStrictEqual(fetchedUser, createdUser);
    });

    test("should return null or undefined for non-existing user", async () => {
      const user = await userRepositoryTest.findById(9999);
      assert.strictEqual(user, null || undefined);
    });
  });

  describe("findByIdWithArticles()", async () => {
    test("should return a user with articles", async () => {
      const testUser = { name: "Test User", email: "testuser@example.com" };
      const createdUser = await userRepositoryTest.create(testUser);

      await userRepositoryTest.db.run(
        "INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)",
        ["Article 1", "Content 1", createdUser.id],
      );
      await userRepositoryTest.db.run(
        "INSERT INTO articles (title, content, user_id) VALUES (?, ?, ?)",
        ["Article 2", "Content 2", createdUser.id],
      );

      const userWithArticles = await userRepositoryTest.findByIdWithArticles(
        createdUser.id,
      );
      assert.strictEqual(userWithArticles.articles.length, 2);
      assert.strictEqual(userWithArticles.articles[0].user_id, createdUser.id);
      assert.strictEqual(userWithArticles.articles[1].user_id, createdUser.id);
    });
  });

  describe("create()", async () => {
    test("should create a new user", async () => {
      const testUser = { name: "Test User", email: "testuser@example.com" };
      const newUser = await userRepositoryTest.create(testUser);

      assert.ok(newUser.id, "L'utilisateur doit avoir un ID");
      assert.strictEqual(newUser.name, testUser.name);
      assert.strictEqual(newUser.email, testUser.email);
    });
  });

  describe("update()", async () => {
    test("should update an existing user", async () => {
      const testUser = { name: "Test User", email: "testuser@example.com" };
      const createdUser = await userRepositoryTest.create(testUser);

      const updatedData = {
        name: "Updated User",
        email: "updated@example.com",
      };
      const updatedUser = await userRepositoryTest.update(
        createdUser.id,
        updatedData,
      );

      assert.strictEqual(updatedUser.name, updatedData.name);
      assert.strictEqual(updatedUser.email, updatedData.email);
    });

    test("should throw an error when updating a non-existing user", async () => {
      try {
        await userRepositoryTest.update(9999, { name: "Should Fail" });
        assert.fail("Expected error not thrown");
      } catch (error) {
        assert.strictEqual(error.message, "Aucun utilisateur modifié.");
      }
    });
  });

  describe("delete()", async () => {
    test("should delete an existing user", async () => {
      const testUser = { name: "Test User", email: "testuser@example.com" };
      const createdUser = await userRepositoryTest.create(testUser);
      const deletedUser = await userRepositoryTest.delete(createdUser.id);

      assert.deepStrictEqual(deletedUser, createdUser);
      const fetchedUser = await userRepositoryTest.findById(createdUser.id);
      assert.strictEqual(fetchedUser, null || undefined);
    });

    test("should return null when trying to delete a non-existing user", async () => {
      const deletedUser = await userRepositoryTest.delete(9999);
      assert.strictEqual(deletedUser, null);
    });
  });
});

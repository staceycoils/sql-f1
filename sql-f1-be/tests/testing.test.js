const request = require("supertest");
// const db = require("../connection");

// jest.useFakeTimers(2000)

// afterAll(()=> db.end())

describe("db setup", () => {
    test("adds 1 + 2 to equal 3", () => {
        expect(1+2).toBe(3);
      });
    test("connection to mysql", () => {
        // return request(app)
    });
});
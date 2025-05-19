import { flattenObject } from "./flattenObject";

describe("flattenObject", () => {
  it("should flatten a simple object", () => {
    const input = {
      name: "John",
      age: 30,
    };
    const expected = {
      name: "John",
      age: 30,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should flatten a nested object", () => {
    const input = {
      user: {
        name: "John",
        address: {
          city: "New York",
          country: "USA",
        },
      },
    };
    const expected = {
      "user.name": "John",
      "user.address.city": "New York",
      "user.address.country": "USA",
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should flatten an object with arrays", () => {
    const input = {
      name: "John",
      hobbies: ["reading", "gaming", "coding"],
    };
    const expected = {
      name: "John",
      "hobbies[0]": "reading",
      "hobbies[1]": "gaming",
      "hobbies[2]": "coding",
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should flatten an object with nested arrays of objects", () => {
    const input = {
      users: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
      ],
    };
    const expected = {
      "users[0].name": "John",
      "users[0].age": 30,
      "users[1].name": "Jane",
      "users[1].age": 25,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle null values", () => {
    const input = {
      name: "John",
      address: null,
    };
    const expected = {
      name: "John",
      address: null,
    };
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle empty object", () => {
    const input = {};
    const expected = {};
    expect(flattenObject(input)).toEqual(expected);
  });

  it("should handle complex nested structure", () => {
    const input = {
      user: {
        name: "John",
        contacts: [
          { type: "email", value: "john@example.com" },
          { type: "phone", value: "123-456-7890" },
        ],
        settings: {
          notifications: {
            email: true,
            sms: false,
          },
        },
      },
    };
    const expected = {
      "user.name": "John",
      "user.contacts[0].type": "email",
      "user.contacts[0].value": "john@example.com",
      "user.contacts[1].type": "phone",
      "user.contacts[1].value": "123-456-7890",
      "user.settings.notifications.email": true,
      "user.settings.notifications.sms": false,
    };
    expect(flattenObject(input)).toEqual(expected);
  });
});

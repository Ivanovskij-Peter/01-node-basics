const { autorize } = require("../helpers/auth.middleware");
const dotenv = require("dotenv");
const User = require("../user/User");

describe("Shoud test autorize middleware", () => {
  let responseMock;
  let nextMock;

  beforeAll(() => {
    dotenv.config();
    jest.mock("../user/User");
    const response = {
      test: "data",
    };
    User.findById = jest.fn(() => Promise.resolve(response));
  });
  beforeEach(() => {
    responseMock = {
      status: jest.fn(() => {
        return {
          send: jest.fn(),
        };
      }),
    };
    nextMock = jest.fn();
  });

  it("User token is missed", () => {
    const requestMock = {
      get: jest.fn(),
    };

    autorize(requestMock, responseMock, nextMock);

    expect(responseMock.status.mock.calls.length).toBe(1);
    expect(responseMock.status.mock.calls[0][0]).toBe(401);

    const sendMock = responseMock.status.mock.results[0].value.send;

    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toBe("Token is not valid");
  });
  it("User token is invalid", () => {
    const requestMock = {
      get: jest.fn(() => "asas2132132121321312xdsasad"),
    };

    autorize(requestMock, responseMock, nextMock);

    expect(responseMock.status.mock.calls.length).toBe(1);
    expect(responseMock.status.mock.calls[0][0]).toBe(401);

    const sendMock = responseMock.status.mock.results[0].value.send;

    expect(sendMock.mock.calls.length).toBe(1);
    expect(sendMock.mock.calls[0][0]).toBe("Token is not valid");
  });
  it("User token is valid", async () => {
    const requestMock = {
      get: jest.fn(() => "valid token of user!!"),
    };

    await autorize(requestMock, responseMock, nextMock);

    expect(sendMock.mock.calls.length).toBe(1);
  });
});

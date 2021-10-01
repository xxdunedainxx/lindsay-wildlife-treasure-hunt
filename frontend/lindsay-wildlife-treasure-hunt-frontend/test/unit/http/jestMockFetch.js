import fetchMock from "jest-fetch-mock";

export function setupFetchMock(){

  global.fetch = require('jest-fetch-mock');

  beforeEach(() => {
    fetch.resetMocks();
  });

  fetchMock.enableMocks();
}
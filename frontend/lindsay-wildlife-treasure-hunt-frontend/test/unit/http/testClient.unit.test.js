//https://jestjs.io/docs/expect#not
import Setup from '../../../src/src/util/Setup';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';
import TestClient from '../../../src/src/http/clients/TestClient';
import { setupFetchMock } from './jestMockFetch.js'
import { goodTestClientData, badData } from './mockData.js'

import fetchMock from "jest-fetch-mock";
import 'regenerator-runtime'

setupFetchMock()
Setup.Run()


test('Execute a valid test HTTP request', async () => {
  console.log('Execute a valid test HTTP request')
  fetch.mockResponseOnce(JSON.stringify(goodTestClientData()));
  var testClient = new TestClient(Configuration.remoteEndpoint)
  await expect(testClient.testRequest()).resolves.toBe(undefined)
});

test('Execute a bad test HTTP request', async () => {
  console.log('Execute a bad test HTTP request')
  fetch.mockResponseOnce(JSON.stringify(badData()));
  var testClient = new TestClient(Configuration.remoteEndpoint)
  await expect(testClient.testRequest()).rejects.toThrow()
});
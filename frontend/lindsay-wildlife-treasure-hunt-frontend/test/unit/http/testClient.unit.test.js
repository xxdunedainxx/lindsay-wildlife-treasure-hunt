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

async function testRequest(){
  var testClient = new TestClient(Configuration.remoteEndpoint)
  await testClient.testRequest().catch(error => { throw error})
}

test('Execute a valid test HTTP request', () => {
  console.log('Execute a valid test HTTP request')
  fetch.mockResponseOnce(JSON.stringify(goodTestClientData()));
  expect(testRequest()).resolves.toBe(null)
});

test('Execute a bad test HTTP request', () => {
  console.log('Execute a bad test HTTP request')
  fetch.mockResponseOnce(JSON.stringify(badData()));
  // const res = await testRequest()
  expect(testRequest()).rejects.toThrow()
});
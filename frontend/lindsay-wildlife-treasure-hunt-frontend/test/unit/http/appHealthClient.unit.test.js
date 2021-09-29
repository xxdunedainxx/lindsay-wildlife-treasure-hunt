import Setup from '../../../src/src/util/Setup';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';
import AppHealthClient from '../../../src/src/http/clients/AppHealthClient';
import { setupFetchMock } from './jestMockFetch.js'
import { goodAppHealthData, badData } from './mockData.js'

import fetchMock from "jest-fetch-mock";
import 'regenerator-runtime'

setupFetchMock()
Setup.Run()

async function testHealthRequest(){
  var appHealthClient = new AppHealthClient(Configuration.healthEndpoint)
  await appHealthClient.health().catch(error => { throw error})
}

test('Execute a valid HTTP app health request', () => {
  console.log('Execute a valid HTTP app health request')
  fetch.mockResponseOnce(JSON.stringify(goodAppHealthData()));
  expect(testHealthRequest()).resolves.toBe(null)
});

test('Execute a bad HTTP app health request', () => {
  console.log('Execute a bad HTTP app health request')
  fetch.mockResponseOnce(JSON.stringify(badData()));
  expect(testHealthRequest()).rejects.toThrow()
});
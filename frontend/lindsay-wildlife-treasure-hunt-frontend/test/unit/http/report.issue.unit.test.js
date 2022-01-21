import Setup from '../../../src/src/util/Setup';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';
import ReportAnIssueClient from '../../../src/src/http/clients/ReportAnIssueClient';
import { setupFetchMock } from './jestMockFetch.js'
import { goodAppHealthData, badData } from './mockData.js'

import fetchMock from "jest-fetch-mock";
import 'regenerator-runtime'

setupFetchMock()
Setup.Run()

test('Execute a valid HTTP report issue request', async () => {
  console.log('Execute a valid HTTP app health request')
  fetch.mockResponseOnce(JSON.stringify(goodAppHealthData()));
  var appHealthClient = new AppHealthClient(Configuration.healthEndpoint)
  await expect(appHealthClient.health()).resolves.toBe(undefined)
});

test('Execute a bad HTTP app health request', async () => {
  console.log('Execute a bad HTTP app health request')
  fetch.mockResponseOnce(JSON.stringify(badData()));
  var appHealthClient = new AppHealthClient(Configuration.healthEndpoint)
  await expect(appHealthClient.health()).rejects.toThrow()
});
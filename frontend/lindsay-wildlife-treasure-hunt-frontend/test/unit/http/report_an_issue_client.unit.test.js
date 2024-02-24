// https://jestjs.io/docs/asynchronous

import Setup from '../../../src/src/util/Setup';
import Configuration from '../../../src/src/conf/Configuration';
import Logger from '../../../src/src/util/Logger';
import Session from '../../../src/src/util/Session';
import ReportAnIssueClient from '../../../src/src/http/clients/ReportAnIssueClient';
import { setupFetchMock } from './jestMockFetch.js'
import { goodAppHealthData, badData } from './mockData.js'

import fetchMock from "jest-fetch-mock";
import 'regenerator-runtime'

setupFetchMock()
Setup.Run()


test('Test report with empty session', async () => {
  console.log('Execute a valid HTTP app health request')
  fetch.mockResponseOnce(JSON.stringify(goodAppHealthData()));
  var appHealthClient = new ReportAnIssueClient()
  await expect(appHealthClient.report("Test message")).resolves.toBe(undefined)
});

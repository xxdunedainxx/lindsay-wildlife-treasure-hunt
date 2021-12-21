/*
  Example Usage: 
    var client = new HttpClient("https://gorest.co.in/public/v1")
    client.get('users')
*/

import Logger from '../util/Logger';

class HttpClient {
  url=""

  constructor(url) {
    this.url = url
  }

  // get method wrapper retry w/ retry
  // TODO
  // getRetry(endpoint, resultMethod = alert, errorMethod = alert, retries=5, sleepTime=3000){
  //   setTimeout(
  //     function(){

  //     }, sleepTime
  //   );
  // }

  async post(endpoint, data, resultMethod = console.log, errorMethod = console.log) {
    console.log("post data:")
    console.log(data)
    var requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${this.url}/${endpoint}`, requestData)
    .then(res => res.json())
    .then(
      (result) => {
        Logger.debug(`HTTP POST request succeeded to endpoint ${this.url}/${endpoint}, with response ${JSON.stringify(result)}`)
        resultMethod(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error.stack)
        Logger.error(`HTTP POST request failed to endpoint ${this.url}/${endpoint}, with error ${JSON.stringify(error)}`)
        errorMethod(error)
      }
    )
  }

  async get(endpoint, resultMethod = console.log, errorMethod = console.log){
   return fetch(`${this.url}/${endpoint}`)
      .then(res => res.json())
      .then(
        (result) => {
          Logger.debug(`HTTP GET request succeeded to endpoint ${this.url}/${endpoint}, with response ${JSON.stringify(result)}`)
          resultMethod(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          Logger.error(`HTTP GET request failed to endpoint ${this.url}/${endpoint}, with error ${JSON.stringify(error)}`)
          errorMethod(error)
        }
      )
  }
}

export default HttpClient;
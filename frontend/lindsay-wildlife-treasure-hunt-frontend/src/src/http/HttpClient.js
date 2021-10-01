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

  get(endpoint, resultMethod = console.log, errorMethod = console.log){
    fetch(`${this.url}/${endpoint}`)
      .then(res => res.json())
      .then(
        (result) => {
          Logger.debug(`HTTP request succeeded to endpoint ${this.url}/${endpoint}, with response ${JSON.stringify(result)}`)
          resultMethod(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          Logger.error(`HTTP request failed to endpoint ${this.url}/${endpoint}, with error ${JSON.stringify(error)}`)
          errorMethod(error)
        }
      )
  }
}

export default HttpClient;
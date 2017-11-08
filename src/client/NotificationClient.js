const request = require('request');

class NotificationClient {

  /**
   * @param {string}  endpoint - Endpoint to connect
   * @param {string} authKey - Authorization Key given in the notification API
   * @return {NotificationClient} Notification Client
   */
  constructor(endpoint, authKey) {
    this.endpoint = endpoint;
    this.authKey = authKey;
  }

  /**
   * Send a Web Hook
   * @param {string}  triggerUrl - Trigger URL to call
   * @param {string} eventName - Event name for hook is called
   * @param {string} payload - Payload Data to send in the POST request
   * @return {Promise} Promise returned when notification server enqueue the request
   */
  triggerWebHook(triggerUrl, eventName, payload) {
    return new Promise((resolve, reject) => {
      var url = this.endpoint + "/webhooks"
      request({
        url: url,
        method: "POST",
        json: true,
        headers: {
          'X-Api-Key': this.authKey,
        },
        body: {
          url: triggerUrl,
          event: eventName,
          payload: payload
        }
      },
        function (error, response, body) {
          if (error) {
            return reject(error);
          }

          if (response.statusCode >= 200 && response.statusCode <= 210) {
            resolve(body);
          } else {
            body.rawResponse = response.toJSON();
            return reject(body);
          }

        });
    });
  }

  triggerMail(mailOptions) {

  }
}

module.exports = NotificationClient;
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
   * @param {Object} hooks - Urls to trigger
   * @param {string} eventName - Event name for hook is called
   * @param {string} payload - Payload Data to send in the POST request
   * @return {Promise} Promise returned when notification server enqueue the request
   */
  triggerWebHooks(hooks, eventName, payload) {
    return new Promise((resolve, reject) => {
      if (hooks.length === 0) {
        const err = new Error('AT_LEAST_ONE_HOOK_IS_REQUIRED');
        err.type = err.message;
        return reject(err);
      }
      
      request({
        url: `${this.endpoint}/webhooks`,
        method: "POST",
        json: true,
        headers: {
          'X-Api-Key': this.authKey,
        },
        body: {
          hooks: hooks,
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
            reject(body);
          }

        });
    });
  }

  triggerMail(mailOptions) {

  }
}

module.exports = NotificationClient;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationClient = function () {

    /**
     * @param {string}  endpoint - Endpoint to connect
     * @param {string} authKey - Authorization Key given in the notification API
     * @return {NotificationClient} Notification Client
     */
    function NotificationClient(endpoint, authKey) {
        _classCallCheck(this, NotificationClient);

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


    _createClass(NotificationClient, [{
        key: "triggerWebHook",
        value: function triggerWebHook(triggerUrl, eventName, payload) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var url = _this.endpoint + "/webhooks";
                (0, _request2.default)({
                    url: url,
                    method: "POST",
                    json: true,
                    body: {
                        url: triggerUrl,
                        event: eventName,
                        payload: payload
                    }
                }, function (error, response, body) {
                    if (error) {
                        return reject(error);
                    }
                    resolve(body);
                });
            });
        }
    }, {
        key: "triggerMail",
        value: function triggerMail(mailOptions) {}
    }]);

    return NotificationClient;
}();

exports.default = NotificationClient;
//# sourceMappingURL=NotificationClient.js.map
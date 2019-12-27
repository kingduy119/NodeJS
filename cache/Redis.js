const Redis = require('redis');
const bluebird = require('bluebird');

const Client = Redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
    detect_buffers: true
});

class RedisController {
    constructor() {
        if(RedisController.exists) {
            console.log("Redis exists");
            return RedisController.instance
        };
        console.log("Redis not exists");
        this.redis = Redis;
        this.client = Client;
        bluebird.promisifyAll(Redis.RedisClient.prototype);
        bluebird.promisifyAll(Redis.Multi.prototype);
        RedisController.instance = this;
        RedisController.exists = true;
        return this;
    }

    getClient() { return this.client; }

    getRedis() { return this.redis; }
}
const redis = new RedisController();
module.exports = redis;


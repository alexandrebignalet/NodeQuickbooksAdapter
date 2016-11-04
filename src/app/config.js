'use strict';

const quickBooksConfig = {
    consumer_key:    'qyprdZBVlz5PeYSzvBMt0ZK4E27pbQ',
    consumer_secret: 'eSdp2o7thAlbiQCaf0IEYD8lqNUW1pqpZKPbosaC',
    realmId:         '123145759008447',
    useSandbox:      true,
    debug:           false
};

const env = {
    url: null,
    port: null
};

const prefix = 'dataengine'

env.fullUrl = () => {
    return env.url+':'+env.port;
};

switch(process.argv[2]){
    case 'dev':
        env.port = '8080'
        env.socketPort = '8081'
        env.url = 'http://localhost'
        env.redisHost = 'datatool.dev'
        break
    case 'prod':
        env.port = '8080'
        env.socketPort = '8081'
        env.url = 'http://localhost'
        env.redisHost = 'redis'

        quickBooksConfig.useSandbox = false
        quickBooksConfig.debug = false
        break
    default:
        console.error('Precise your environment. (node app/server.js prod)')
        process.exit();
}

module.exports = {
    quickBooksConfig,
    env,
    prefix
};
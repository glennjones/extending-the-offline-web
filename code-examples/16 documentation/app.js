'use strict';
/*
Demos of hapi-swagger plug-in adding auto documenting API

A request to http://localhost:3000/documentation#/ will display documentation - note function are moched
*/

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Routes = require('./lib/routes');
const SwaggerOptions = require('./lib/swagger-options');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 3000
});


const goodOptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};


server.register([
    Inert,
    Vision,
    Blipp,
    {
        register: require('good'),
        options: goodOptions
    },{
        register: HapiSwagger,
        options: SwaggerOptions
    }], (err) => {

    server.route(Routes);
    server.start(() => {

        console.log('Server running at:', server.info.uri);
    });
});


// add templates only for testing custom.html
server.views({
    path: 'bin',
    engines: { html: require('handlebars') },
    isCached: false
});


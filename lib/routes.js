'use strict';
const Joi = require('joi');
const Path = require('path');


module.exports = [{
    method: 'GET',
    path: '/slides/{path*}',
    handler: {
        directory: {
            path: Path.join( __dirname, '../slides'),
            listing: false,
            index: true
        }
    }
},{
    method: 'GET',
    path: '/data/{path*}',
    handler: {
        directory: {
            path: Path.join( __dirname, '../data'),
            listing: false,
            index: true
        }
    }
},{
    method: 'GET',
    path: '/code/{path*}',
    handler: {
        directory: {
            path: Path.join( __dirname, '../code'),
            listing: false,
            index: true
        }
    }
},{
    method: 'GET',
    path: '/mani/mani.js',
    handler: {
        file: Path.join( __dirname, '../node_modules/mani/mani.js')
    }
},{
    method: 'GET',
    path: '/mani/mani-persist.js',
    handler: {
        file: Path.join( __dirname, '../node_modules/mani/mani-persist.js')
    }
}];

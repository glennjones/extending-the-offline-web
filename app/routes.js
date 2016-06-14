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
},{
    method: 'GET',
    path: '/codemirror/codemirror.js',
    handler: {
        file: Path.join( __dirname, '../node_modules/codemirror/lib/codemirror.js')
    }
},{
    method: 'GET',
    path: '/codemirror/codemirror.css',
    handler: {
        file: Path.join( __dirname, '../node_modules/codemirror/lib/codemirror.css')
    }
},{
    method: 'GET',
    path: '/codemirror/mode/{path*}',
    handler: {
        directory: {
            path: Path.join( __dirname, '../node_modules/codemirror/mode'),
            listing: true,
            index: true
        }
    }
}];

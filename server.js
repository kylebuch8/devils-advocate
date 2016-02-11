'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Boom = require('boom');
const Mongoose = require('mongoose');
const Group = require('./models/group');

if (!process.env.GROUP_PASSWORD) {
    const env = require('./env.js');
}

const password = process.env.GROUP_PASSWORD;
const MONGO_URI = process.env.MONGOLAB_URI;

Mongoose.connect(MONGO_URI + '/devil');

server.connection({
    //host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080'
});

server.state('data', {
    ttl: null,
    path: '/',
    encoding: 'base64json',
    clearInvalid: false,
    strictHeader: true
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file('./client/index.html');
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, reply) => {
            var error;

            if (!request.payload.email || !request.payload.password || request.payload.password !== password) {
                error = Boom.unauthorized('invalid username or password');
                return reply(error);
            }

            Group.findOne({
                members: {
                    $in: [request.payload.email]
                }
            }, (err, group) => {
                if (err) {
                    error = Boom.badRequest('invalid request');
                    return reply(error);
                }

                if (!group) {
                    error = Boom.unauthorized('invalid username or password');
                    return reply(error);
                }

                return reply({
                    success: true,
                    group: group
                }).state('data', { groupid: group._id });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/group',
        handler: (request, reply) => {
            var error;

            if (!request.state.data.groupid) {
                error = Boom.badRequest('no group id');
                return reply(error);
            }

            Group.findById(request.state.data.groupid, (err, group) => {
                if (err) {
                    error = Boom.badRequest('invalid request');
                    return reply(error);
                }

                return reply(group);
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/group/{groupId}/toggle-email',
        handler: (request, reply) => {
            var error;

            Group.findByIdAndUpdate(request.state.data.groupid, {
                $set: {
                    sendEmail: request.payload.sendEmail
                }
            }, {
                new: true
            }, (err, group) => {
                if (err) {
                    error = Boom.badRequest('invalid request');
                    return reply(error);
                }

                return reply(group);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'client',
                listing: true
            }
        }
    });

});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at: ', server.info.uri);
});

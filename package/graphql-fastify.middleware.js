"use strict";
exports.__esModule = true;
var apollo_server_core_1 = require("apollo-server-core");
function graphQLFastify(options) {
    if (!options) {
        throw new Error("Apollo Server requires options.");
    }
    return function (req, res, next) {
        apollo_server_core_1.runHttpQuery([req, res], { method: req.method, options: options, query: req.method === "POST" ? req.body : req.query })
            .then(function (gqlResponse) {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Content-Length", Buffer.byteLength(gqlResponse, "utf8").toString());
            res.write(gqlResponse);
            res.end();
        })["catch"](function (error) {
            if ("HttpQueryError" !== error.name) {
                return next(error);
            }
            if (error.headers) {
                Object.keys(error.headers).forEach(function (header) {
                    res.setHeader(header, error.headers[header]);
                });
            }
            res.statusCode = error.statusCode;
            res.write(error.message);
            res.end();
        });
    };
}
exports.graphQLFastify = graphQLFastify;

//# sourceMappingURL=graphql-fastify.middleware.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
function fastifyGraphQL(options) {
    if (!options) {
        throw new Error("Apollo Server requires options.");
    }
    return (req, res, next) => {
        apollo_server_core_1.runHttpQuery([req, res], { method: req.method, options, query: req.method === "POST" ? req.body : req.query })
            .then(gqlResponse => {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Content-Length", Buffer.byteLength(gqlResponse, "utf8").toString());
            res.write(gqlResponse);
            res.end();
        })
            .catch((error) => {
            if ("HttpQueryError" !== error.name) {
                return next(error);
            }
            if (error.headers) {
                Object.keys(error.headers).forEach(header => {
                    res.setHeader(header, error.headers[header]);
                });
            }
            res.statusCode = error.statusCode;
            res.write(error.message);
            res.end();
        });
    };
}
exports.fastifyGraphQL = fastifyGraphQL;

//# sourceMappingURL=fastify-graphql.middleware.js.map

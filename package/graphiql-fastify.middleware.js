"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_module_graphiql_1 = require("apollo-server-module-graphiql");
const url_1 = require("url");
function graphiQLFastify(options) {
    return (req, res, next) => {
        const query = req.url && url_1.parse(req.url, true).query;
        apollo_server_module_graphiql_1.resolveGraphiQLString(query, options, [res, req])
            .then(graphiqlString => {
            res.setHeader("Content-Type", "text/html");
            res.write(graphiqlString);
            res.end();
        })
            .catch(error => {
            next(error.message);
        });
    };
}
exports.graphiQLFastify = graphiQLFastify;

//# sourceMappingURL=graphiql-fastify.middleware.js.map

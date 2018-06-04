"use strict";
exports.__esModule = true;
var apollo_server_module_graphiql_1 = require("apollo-server-module-graphiql");
var url_1 = require("url");
function graphiQLFastify(options) {
    return function (req, res, next) {
        var query = req.url && url_1.parse(req.url, true).query;
        apollo_server_module_graphiql_1.resolveGraphiQLString(query, options, [res, req])
            .then(function (graphiqlString) {
            res.setHeader("Content-Type", "text/html");
            res.write(graphiqlString);
            res.end();
        })["catch"](function (error) {
            next(error.message);
        });
    };
}
exports.graphiQLFastify = graphiQLFastify;

//# sourceMappingURL=graphiql-fastify.middleware.js.map

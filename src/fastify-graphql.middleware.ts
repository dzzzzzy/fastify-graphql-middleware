import { GraphQLOptions, HttpQueryError, runHttpQuery } from "apollo-server-core";

export type FastifyGraphQLOptionFunction = (req?: any, res?: any) => GraphQLOptions;

export function fastifyGraphQL(options: FastifyGraphQLOptionFunction): (req?: any, res?: any, next?: any) => any {
    if (!options) {
        throw new Error("Apollo Server requires options.");
    }

    return (req, res, next) => {
        runHttpQuery([req, res], { method: req.method, options, query: req.method === "POST" ? req.body : req.query })
            .then(gqlResponse => {
                res.setHeader("Content-Type", "application/json");
                res.setHeader("Content-Length", Buffer.byteLength(gqlResponse, "utf8").toString());
                res.write(gqlResponse);
                res.end();
            })
            .catch((error: HttpQueryError) => {
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
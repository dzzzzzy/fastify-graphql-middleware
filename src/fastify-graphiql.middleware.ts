import { GraphiQLData, resolveGraphiQLString } from "apollo-server-module-graphiql";
import { parse } from "url";
import { error } from "util";

export function fastifyGraphiQL(options: GraphiQLData): (req?: any, res?: any, next?: any) => any {
    return (req, res, next) => {
        const query = req.url && parse(req.url, true).query;
        resolveGraphiQLString(query, options, [res, req])
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
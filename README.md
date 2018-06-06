# fastify-graphql-middleware

## Installation

```bash
# npm install
npm install fastify-graphql-middleware

# yarn add
yarn add fastify-graphql-middleware
```

## Usage

install [body-parser](https://yarnpkg.com/en/package/body-parser) at first.

Example:

```typescript
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLFactory, GraphQLModule } from "@nestjs/graphql";
import { fastifyGraphiQL, fastifyGraphQL } from "fastify-graphql-middleware";
import * as bodyParser from "body-parser";

@Module({
    imports: [GraphQLModule],
})
export class ApplicationModule implements NestModule {
    constructor(private readonly graphQLFactory: GraphQLFactory) { }

    configure(consumer: MiddlewareConsumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths("./**/*.graphql");
        const schema = this.graphQLFactory.createSchema({ typeDefs });

        consumer
            .apply(fastifyGraphiQL({ endpointURL: "/graphql" }))
            .forRoutes("/graphiql")
            .apply(bodyParser.json())
            .forRoutes("/graphql")
            .apply(fastifyGraphQL(req => ({ schema, rootValue: req })))
            .forRoutes("/graphql");
    }
}
```
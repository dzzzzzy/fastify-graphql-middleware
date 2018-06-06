# graphql-fastify-middlewar

## Installation

```bash
# npm
npm install graphql-fastify-middlewar

# yarn
yarn add graphql-fastify-middlewar
```

## Usage

install [body-parser](https://yarnpkg.com/en/package/body-parser) at first.

Example:

```typescript
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLFactory, GraphQLModule } from "@nestjs/graphql";

@Module({
    imports: [GraphQLModule],
})
export class ApplicationModule implements NestModule {
    constructor(private readonly graphQLFactory: GraphQLFactory) { }

    configure(consumer: MiddlewareConsumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths("./**/*.graphql");
        const schema = this.graphQLFactory.createSchema({ typeDefs });

        consumer
            .apply(graphiQLFastify({ endpointURL: "/graphql" }))
            .forRoutes("/graphiql")
            .apply(bodyParser.json())
            .forRoutes("/graphql")
            .apply(graphQLFastify(req => ({ schema, rootValue: req })))
            .forRoutes("/graphql");
    }
}
```
import { Table, DrizzleTypeError, InferSelectModel, InferInsertModel } from "drizzle-orm";
import { createSelectSchema, createInsertSchema, Refine } from "drizzle-zod";
import { z } from "zod";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

type TRefine<TTable extends Table> = Refine<TTable, 'select'>;

type SchemaData<TTable extends Table> = {
    [K in keyof TRefine<TTable>]: K extends keyof TTable['_']['columns'] ? TRefine<TTable>[K] : DrizzleTypeError<`Column '${K & string}' does not exist in table '${TTable['_']['name']}'`>;
};

export const registry = new OpenAPIRegistry();
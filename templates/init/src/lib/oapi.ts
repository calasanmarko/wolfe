import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "../models/models.js";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { JsonObject } from "swagger-ui-express/index.js";
import { merge } from "openapi-merge";
import { SuccessfulMergeResult } from "openapi-merge/dist/data.js";
import { writeFileSync } from "fs";

const config = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'Datenight API'
    },
    servers: [{url: 'https://payroll-demo.click/datenight/api'}],
    baseDir: '..',
    filesPattern: './routes/**/*.ts',
};

export const createSwaggerDoc = async (): Promise<JsonObject> => {
    const routesDoc: JsonObject = await new Promise((resolve, reject) => {
        const dummyApp = {} as any;
        (expressJSDocSwagger as any)(dummyApp)({
            info: {
                version: '1.0.0',
                title: 'Datenight API'
            },
            baseDir: ".",
            filesPattern: './**/*.js',
            exposeSwaggerUI: false,
            exposeApiDocs: false,
        }).on('finish', (doc: JsonObject) => {
            resolve(doc);
        }).on('error', (err: any) => {
            reject(err);
        });
    });

    const generator = new OpenApiGeneratorV3(registry.definitions);
    const modelsDoc = generator.generateDocument(config);

    const mergeResult = merge([{
            oas: {
                openapi: routesDoc.openapi,
                info: routesDoc.info,
                servers: config.servers,
                components: {},
                paths: routesDoc.paths,
            }
        }, {
            oas: {
                ...modelsDoc,
                servers: config.servers,
                components: modelsDoc.components as any,
                paths: {},
            },
        }
    ]) as SuccessfulMergeResult;

    if (mergeResult.output.components) {
        mergeResult.output.components.securitySchemes = {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        };
    }

    mergeResult.output.security = [{
        'BearerAuth': []
    }];

    return mergeResult.output;
};

export const updateDocPackage = (doc: JsonObject) => {
    writeFileSync("./openapi/openapi.json", JSON.stringify(doc));
};
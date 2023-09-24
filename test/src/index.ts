import express from "express";
import Log from "./lib/logging.js";
import pg from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { createSwaggerDoc as createOApiDoc, updateDocPackage } from "./lib/oapi.js";
import { serve, setup } from "swagger-ui-express";
import { router } from "./routes/router.js";

declare global {
    namespace Express {
        export interface Request {
            db: NodePgDatabase,
            session: Session
        }
    }
};

export interface Session {
    
}

const { Pool } = pg;

const port = 7802;
const app = express();

const pool = new Pool();
const db = drizzle(pool);

// Log Middleware
app.use((req, res, next) => {
    if (req.method !== "OPTIONS") {
        Log.log(`${req.method} -> ${req.originalUrl} RECEIVED`);
    }
    next();
});

// Set up input type
app.use(express.json());

// Set up output type
app.use((_, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Database Middleware
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Swagger Endpoint
const oapiDoc = await createOApiDoc();
app.use('/api/docs', (_, res, next) => {
    res.removeHeader('Content-Type');
    next();
}, serve, setup(oapiDoc));

// OPTIONS Endpoint
app.options('*', (_, res) => res.sendStatus(200));

// Wolfe-generated group routes
app.use('/', router);

// Error Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    Log.error(err);
    res.status(500).send(err);
});

if (process.env.NODE_ENV === "development") {
    updateDocPackage(oapiDoc);
    Log.log("OpenAPI Doc Updated");
}

app.listen(port, () => console.log(`Server running on port ${port}`));
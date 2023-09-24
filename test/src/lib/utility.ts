import Log from "./logging.js";

export const handleRoute = async (handler: () => Promise<any>, req, res, next: (err: any) => void) => {
    try {
        const result = await handler();
        res.send(result);

        if (req.method !== "OPTIONS") {
            Log.log(`${req.method} -> ${req.originalUrl} =>`, result);
        }
    } catch (err) {
        next(err);
    }
}
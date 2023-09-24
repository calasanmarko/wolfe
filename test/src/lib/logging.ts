enum Severity {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3
};

const _envSeverity = parseInt(process.env.LOG_SEVERITY ?? '0');
const _severity = !_envSeverity || isNaN(_envSeverity) ? Severity.Info : _envSeverity;

const Log = {
    write: (severity: Severity, message?: any, params?: any[]) => {
        if (params?.length == 0) {
            params = undefined;
        }

        if (severity >= _severity) {
            const entry = `[${new Date().toISOString()}, ${Severity[severity]}]: ${message}`;
            switch (severity) {
                case Severity.Debug: params ? console.debug(entry, params) : console.debug(entry); break;
                case Severity.Info: params ? console.info(entry, params) : console.info(entry); break;
                case Severity.Warning: params ? console.warn(entry, params) : console.warn(entry); break;
                case Severity.Error: params ? console.error(entry, params) : console.error(entry); break;
            }
        }
    },
    debug: (message?: any, ...params: any[]) => Log.write(Severity.Debug, message, params),
    log: (message?: any, ...params: any[]) => Log.write(Severity.Info, message, params),
    warn: (message?: any, ...params: any[]) => Log.write(Severity.Warning, message, params),
    error: (message?: any, ...params: any[]) => Log.write(Severity.Error, message, params),
};

export default Log;
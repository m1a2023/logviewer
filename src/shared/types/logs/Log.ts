
export type LogLevelType = "info" | "warning" | "debug" | "error" | "trace" |
                        "INFO" | "WARNING" | "DEBUG" | "ERROR" | "TRACE";

export type Log = {
    message: string;

    level?: LogLevelType;
    timestamp?: string;
    
    [key: string]: string[] | string | undefined;
};
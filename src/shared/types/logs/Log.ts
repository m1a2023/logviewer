
export type LogLevelType = "info" | "warning" | "debug" | "error" | "trace" | "unknown" |
                        "INFO" | "WARNING" | "DEBUG" | "ERROR" | "TRACE" | 
                        "UNKNOWN";

export type Log = {
    message: string;

    level?: LogLevelType;
    timestamp?: string;
    
    [key: string]: string[] | string | undefined;
};
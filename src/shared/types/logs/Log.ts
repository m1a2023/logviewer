
export type LogLevelType = "info" | "warning" | "debug" | "error" |
                        "INFO" | "WARNING" | "DEBUG" | "ERROR";

export type Log = {
    msg: string;

    level?: LogLevelType;
    timestamp?: string;
    
    [key: string]: string[] | string | undefined;
};
export type SegmentType = "plan" | "apply" | "PLAN" | "APPLY";

export interface SubSegment {
    Type: string;
    Id: string;
    StartTime: string;
    EndTime: string;
    ErrorOccurred: boolean;
    Logs: {
        Id: string;
        level: string;
        message: string;
        timestamp: string;
        [detaild: string]: string;
    }[];
}

import type { Log } from "../logs/Log";

export type SegmentType = "plan" | "apply" | "PLAN" | "APPLY";

export type Segment = {
    id: number;
    type: SegmentType;
    logs: Log[];
    logs_start: number;
    logs_end: number;
};
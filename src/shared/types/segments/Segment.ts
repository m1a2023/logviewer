import type { Log } from "../logs/Log";
import type {SubSegment} from "./SubSegment.ts";

export type SegmentType = "plan" | "apply" | "PLAN" | "APPLY";

export interface Segment {
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
    SubSegment: SubSegment
}

export interface GRPCPluginSegment {
    id: number;
    segment_id: number;
    filename: string;
    plugin_address: string;
    plugin_name: string;
    success: boolean;
    message: string;
    metadata: {
        matched: number;
        filter_field: string;
        filter_value: string;
    };
    filtered_logs: Log[];
    created_at: string; // timestamp
}
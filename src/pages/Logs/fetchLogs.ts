import type {Log} from "../../shared/types/logs/Log";


import type { Segment } from "./types"; // твой Segment

export async function fetchLogs(): Promise<Segment[]> {
    const response = await fetch("/api/logs"); // или твой реальный endpoint
    if (!response.ok) {
        throw new Error(`Ошибка загрузки логов: ${response.statusText}`);
    }

    const text = await response.text();
    const data = JSON.parse(text);

    console.log(data);


    const segments: Segment[] = data.map((item: any) => ({
        Type: item.Type,
        Id: item.Id,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
        ErrorOccurred: item.ErrorOccurred,
        Logs: item.Logs.map((log: any) => ({
            level: log.level,
            message: log.message,
            timestamp: log.timestamp
        }))
    }));

    return segments;
}
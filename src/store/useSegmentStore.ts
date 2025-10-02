import { create } from "zustand";
import type {Segment} from "../shared/types/segments/Segment.ts";

interface SegmentsStore {
    segments: Segment[];
    loading: boolean;
    error: string | null;
    fetchSegments: (filename: string) => Promise<void>;
}

export const useSegmentsStore = create<SegmentsStore>((set) => ({
    segments: [],
    loading: false,
    error: null,

    fetchSegments: async (filename: string) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/jsonfiles/${filename}/segments`);
            if (!res.ok) throw new Error("Ошибка при загрузке сегментов");
            const segmentsData = await res.json();

            const segments: Segment[] = segmentsData.segments.segments.map((item: any) => ({
                Type: item.Type,
                Id: item.Id,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                ErrorOccurred: item.ErrorOccurred,
                Logs: item.Logs.map((log: any) => ({
                    level: log.level,
                    message: log.message,
                    timestamp: log.timestamp,
                    ...log,
                })),
                SubSegment: item.SubSegment,
            }));

            set({ segments, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
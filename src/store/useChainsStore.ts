import { create } from "zustand";
import type { RequestChain} from "../shared/types/logs/RequestChain.ts";

interface ChainsStore {
    chains: RequestChain[];
    loading: boolean;
    error: string | null;
    fetchChains: (filename: string) => Promise<void>;
}

export const useChainsStore = create<ChainsStore>((set) => ({
    chains: [],
    loading: false,
    error: null,

    fetchChains: async (filename: string) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/jsonfiles/${filename}/chains`);
            if (!res.ok) throw new Error("Ошибка при загрузке chains");
            const chainsData = await res.json();

            const chains: RequestChain[] = chainsData.chains.chains.map((chainItem: any) => ({
                tf_req_id: chainItem.tf_req_id,
                Logs: chainItem.Logs.map((logEntry: any) => {
                    const line = logEntry.line;
                    return {
                        Id: logEntry.Id,
                        message: line.message,
                        level: line.level,
                        timestamp: line.timestamp,
                        ...line,
                    };
                }),
            }));

            set({ chains, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
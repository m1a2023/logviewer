import { create } from "zustand";

interface LogsStore {
    selectedFile: string | null;
    setSelectedFile: (filename: string) => void;
}

export const useLogsStore = create<LogsStore>((set) => ({
    selectedFile: null,
    setSelectedFile: (filename) => set({ selectedFile: filename }),
}));

import type {Log} from "../../shared/types/logs/Log";


export const fetchLogs = async (url: string): Promise<Log[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData: Array<{
            level: string;
            message: string;
            timestamp: string;
            [key: string]: any; // для дополнительных полей
        }> = await response.json();


        const logs: Log[] = rawData.map(item => {
            let loglevel = item.level;
            if (typeof loglevel !== 'string') {
                loglevel = 'UNKNOWN';
            }

            const { message, timestamp, ...rest } = item;
            return {
                level: loglevel,
                msg: message,
                timestamp,
                ...rest, // копируем все остальные поля без изменений
            };
        });

        return logs;
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        throw error; // или возвращай пустой массив, если хочешь избежать ошибки
    }
};
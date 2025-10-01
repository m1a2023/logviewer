import type {Log, LogLevelType} from "../../shared/types/logs/Log";


export const fetchLogs = async (url: string): Promise<Log[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData: Array<Log> = await response.json();


        const logs: Log[] = rawData.map(item => {
            if (typeof item.level !== 'string') {
                item.level = 'UNKNOWN';
            }

            const { msg, level, timestamp, ...rest} = item;

            return {
                msg: item.msg,
                level: item.level,
                timestamp: item.timestamp,
                ...rest, // копируем все остальные поля без изменений
            };
        });

        return logs;
    } catch (error) {
        console.error('Failed to fetch logs:', error);
        throw error; // или возвращай пустой массив, если хочешь избежать ошибки
    }
};
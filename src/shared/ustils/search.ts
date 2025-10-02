export function generateSearchText(log: Log): string {
    const parts: string[] = [];

    // Добавляем известные поля
    if (log.message) parts.push(log.message);
    if (log.level) parts.push(log.level);
    if (log.timestamp) parts.push(log.timestamp);

    // Добавляем все остальные ключи и значения
    for (const [key, value] of Object.entries(log)) {
        if (['message', 'level', 'timestamp'].includes(key)) continue;

        // Ключ тоже добавляем (для поиска по имени поля)
        parts.push(key);

        // Значение — если строка или массив строк
        if (typeof value === 'string') {
            parts.push(value);
        } else if (Array.isArray(value)) {
            parts.push(...value.filter(v => typeof v === 'string') as string[]);
        }
        // Игнорируем другие типы (например, undefined)
    }

    return parts.join(' ').toLowerCase(); // Fuse по умолчанию case-insensitive, но лучше унифицировать
}
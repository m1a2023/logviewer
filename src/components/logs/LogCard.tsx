import React, { useState } from "react";
import type { LogCardProps } from "../../shared/types/logs/LogProps";
import type { LogLevelType } from "../../shared/types/logs/Log";
import { JsonViewer } from "../../widgets/logs/JsonViewer.tsx"

// Цвета для уровней логов
const getLevelClass = (level: LogLevelType): string => {
    switch (level) {
        case "error":
            return "text-danger fw-bold";
        case "warning":
            return "text-warning fw-bold";
        case "info":
            return "text-primary fw-bold";
        case "debug":
            return "text-secondary fw-bold";
        default:
            return "text-dark";
    }
};

const tryParseJSON = (str) => {
    if (typeof str !== 'string') return str;
    try {
        const parsed = JSON.parse(str);
        if (parsed !== null && typeof parsed === 'object') {
            return parsed;
        }
        return str;
    } catch (e) {
        return str;
    }
}

const deepParseJSON = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepParseJSON(tryParseJSON(item)));
    }

    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            // Сначала пробуем распарсить значение, если это строка с JSON
            const parsedValue = tryParseJSON(value);
            // Затем рекурсивно обрабатываем результат
            result[key] = deepParseJSON(parsedValue);
        }
    }
    return result;
}

export const LogCard = ({ log }: LogCardProps): React.ReactElement => {
    const { message, level = "info", timestamp, Id, ...details } = log;
    const [isExpanded, setIsExpanded] = useState(false);

    const hasDetails = Object.keys(details).length > 0;

    const handleToggle = () => {
        if (hasDetails) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div
            className="border-bottom px-2 py-1"
            style={{
                fontFamily: "monospace, sans-serif",
                backgroundColor: "#f8f9fa",
            }}

        >
            {/* Верхняя строка */}
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center"
                     style={{cursor: hasDetails ? "pointer" : "default"}}
                     onClick={handleToggle}
                >
                    {hasDetails && (
                        <span
                            className="text-muted"
                            style={{
                                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        >  ▶
                        </span>
                    )}
                    <span>{Id}</span>
                    <span className={getLevelClass(level)}>[{level}]</span>
                    <span>{message}</span>
                </div>
                <span className="text-muted small">
          {timestamp || new Date().toISOString()}
        </span>
            </div>

            {/* Детали */}
            {isExpanded && hasDetails && (
                <div className="mt-2 p-2 rounded bg-light border" style={{ fontSize: '0.9rem', fontFamily: 'var(--bs-font-monospace, monospace)' }}>
                    <JsonViewer data={deepParseJSON(details)} />
                </div>
            )}
        </div>
    );
};

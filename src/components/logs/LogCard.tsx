import React, { useState } from "react";
import type { LogCardProps } from "../../shared/types/logs/LogProps";
import type { LogLevelType } from "../../shared/types/logs/Log";

// Вспомогательная функция для определения цвета в зависимости от уровня лога
const getLevelColor = (level: LogLevelType): string => {
    const upperLevel = level.toUpperCase();
    switch (upperLevel) {
        case "ERROR":
            return "#ffcccc"; // светло-красный
        case "WARNING":
            return "#fff5cc"; // светло-желтый
        case "INFO":
            return "#e6f7ff"; // светло-голубой
        case "DEBUG":
            return "#f0f0f0"; // светло-серый
        default:
            return "white";
    }
};

export const LogCard = ({ log }: LogCardProps): React.ReactElement => {
    // Состояние для отслеживания, раскрыт ли лог
    const [isExpanded, setIsExpanded] = useState(false);

    // Функция для переключения состояния
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const { msg, level = "info", timestamp, ...details } = log;

    const cardStyle: React.CSSProperties = {
        fontFamily: 'monospace, sans-serif',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '8px',
        backgroundColor: getLevelColor(level),
        overflow: 'hidden',
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        cursor: 'pointer',
        userSelect: 'none',
    };

    const detailsStyle: React.CSSProperties = {
        padding: '12px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#fafafa',
        whiteSpace: 'pre-wrap', // для корректного отображения форматированного JSON
        wordBreak: 'break-all',
    };

    const levelStyle: React.CSSProperties = {
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '3px',
        backgroundColor: 'rgba(0,0,0,0.05)',
    };

    return (
        <div style={cardStyle}>
            {/* Кликабельный заголовок, который всегда виден */}
            <div style={headerStyle} onClick={handleToggle}>
                <span>{isExpanded ? '▼' : '▶'}</span> {/* Иконка-индикатор */}
                <span style={{ color: '#888' }}>{timestamp || new Date().toISOString()}</span>
                <span style={levelStyle}>{level.toUpperCase()}</span>
                <span>{msg}</span>
            </div>

            {/* Детали, которые показываются только если isExpanded === true */}
            {isExpanded && (
                <div style={detailsStyle}>
                    {Object.keys(details).length > 0 ? (
                        <pre>
                            {/* Красиво форматируем оставшиеся поля JSON */}
                            {JSON.stringify(details, null, 2)}
                        </pre>
                    ) : (
                        <em style={{ color: '#888' }}>No additional details.</em>
                    )}
                </div>
            )}
        </div>
    );
};
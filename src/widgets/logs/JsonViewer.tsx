import React, { useState } from 'react';
import {useLogsStore} from "../../store/useLogsStore.ts";


type JsonValue =
    | null
    | string
    | number
    | boolean
    | JsonValue[]
    | { [key: string]: JsonValue };

interface JsonViewerProps {
    data: JsonValue;
    depth?: number;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(depth < 1);
    const selectedFile = useLogsStore((s) => s.selectedFile);

    if (data === null) {
        return <span className="text-info">null</span>;
    }

    if (typeof data === 'string') {
        return <span className="text-success">"{data}"</span>;
    }

    if (typeof data === 'number') {
        return <span className="text-warning">{data}</span>;
    }

    if (typeof data === 'boolean') {
        return <span className="text-warning">{String(data)}</span>;
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return <span>[]</span>;
        }

        return (
            <div className={depth > 0 ? 'ms-3' : ''}>
                <span
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="btn btn-sm btn-link p-0 text-decoration-none fw-normal"
                    style={{ lineHeight: 1 }}
                >
                    {isExpanded ? '▼' : '▶'} [{data.length}]
                </span>
                {isExpanded && (
                    <ul className="list-unstyled mb-0 mt-1">
                        {data.map((item, i) => (
                            <li key={i}>
                                <span className="text-muted">[{i}]</span>:{' '}
                                <JsonViewer data={item} depth={depth + 1} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
        return <span>{"{}"}</span>;
    }

    return (
        <div className={depth > 0 ? 'ms-3' : ''}>
            <span
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn btn-sm btn-link p-0 text-decoration-none fw-normal"
                style={{ lineHeight: 1 }}
            >
                {isExpanded ? '▼' : '▶'} {'{'}
                {keys.length}
                {'}'}
            </span>
            {isExpanded && (
                <ul className="list-unstyled mb-0 mt-1">
                    {keys.map((key) => {
                        const value = data[key];

                        if (key === 'tf_req_id' && typeof value === 'string' && selectedFile) {
                            const url = `${window.location.origin}/chain/${selectedFile}/${value}`;
                            return (
                                <li key={key}>
                                    <strong className="text-primary">"{key}"</strong>:{' '}
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-decoration-underline text-info">
                                        {value}
                                    </a>
                                </li>
                            );
                        }

                        return (
                            <li key={key}>
                                <strong className="text-primary">"{key}"</strong>:{' '}
                                <JsonViewer data={value} depth={depth + 1} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

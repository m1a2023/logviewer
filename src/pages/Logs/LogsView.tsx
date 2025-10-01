import { useEffect, useState, useMemo } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { API_ENDPOINTS } from "../../shared/api/api/endpoints";
import type { DocMultipleResponse } from "../../shared/types/docs/DocumentResponse";
import type {Log, LogLevelType} from "../../shared/types/logs/Log";
import type { Segment } from "../../shared/types/segments/Segment";
import { SegmentList } from "../../widgets/logs/SegmentList";
import {fetchLogs} from "./fetchLogs.ts"
import {LogCard} from "../../components/logs/LogCard.tsx";

type SortConfig = {
    key: 'level' | 'timestamp';
    direction: 'ascending' | 'descending';
};

const levelSeverity: Record<LogLevelType, number> = {
    "ERROR": 5, "error": 5,
    "WARNING": 4, "warning": 4,
    "INFO": 3, "info": 3,
    "DEBUG": 2, "debug": 2,
    "TRACE": 1, "trace": 1
};

export const LogsView = (): React.ReactElement => {
	const [segments, setSegments] = useState<Segment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'timestamp',
        direction: 'ascending'
    });

    const [levelFilters, setLevelFilters] = useState<Record<string, boolean>>({
        "error": true,
        "warning": true,
        "info": true,
        "debug": true,
        "trace": true,
    });


    const ALL_LOG_LEVELS: LogLevelType[] = ["error", "warning", "info", "debug", "trace"];

    const [logs, setLogs] = useState<Log[]>([]);

    const processedLogs = useMemo(() => {
        const filtered = logs.filter(log =>
            levelFilters[log.level || '']
        );

        const sorted = [...filtered].sort((a, b) => {
            if (sortConfig.key === 'level') {
                const levelA = levelSeverity[a.level || 'info'];
                const levelB = levelSeverity[b.level || 'info'];
                if (levelA < levelB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (levelA > levelB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            } else { // Сортировка по timestamp
                const timeA = a.timestamp || '';
                const timeB = b.timestamp || '';
                if (timeA < timeB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (timeA > timeB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            }
        });

        return sorted;
    }, [sortConfig, levelFilters, logs]);

    const requestSort = (key: 'level' | 'timestamp') => {
        let direction: 'ascending' | 'descending' = 'descending';
        if (sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterToggle = (level: string) => {
        setLevelFilters(prevFilters => ({
            ...prevFilters,
            [level]: !prevFilters[level]
        }));
    };

    const getSortIcon = (key: 'level' | 'timestamp') => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'descending' ? ' ▼' : ' ▲';
    }


	const SpinnerContainer = () => (
		<div className="position-absolute top-50 start-50 translate-middle">
			<Spinner type="border" color="primary" className="p-4" />
		</div>
	);

    useEffect(() => {
        const loadLogs = async () => {
            try {
                const data = await fetchLogs('http://127.0.0.1:8000/logs'); // или твой URL
                console.log(data);
                setLogs(data);
                console.log(logs);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
                console.log(logs)
            }
        };

        loadLogs();
    }, []);

    useEffect(() => {
        console.log("Raw logs:", logs);
        console.log("Processed logs:", processedLogs);
    }, [logs, processedLogs]);

    if (loading) return <div>Загрузка...</div>;


	return (
        <div className={"p-2"}>
            <div style={{marginBottom: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px'}}>
                {/* Блок фильтров */}
                <div style={{marginBottom: '10px'}}>
                    <strong>Filter by Level:</strong>
                    {ALL_LOG_LEVELS.map(level => (
                        <button
                            key={level}
                            onClick={() => handleFilterToggle(level)}
                            style={{
                                marginLeft: '10px',
                                padding: '5px 10px',
                                border: '1px solid #ccc',
                                backgroundColor: levelFilters[level] ? '#cce5ff' : '#fff',
                                fontWeight: levelFilters[level] ? 'bold' : 'normal',
                                cursor: 'pointer'
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <div>
                    <strong>Sort by:</strong>
                    <button onClick={() => requestSort('timestamp')} style={{marginLeft: '10px', padding: '5px 10px'}}>
                        Timestamp{getSortIcon('timestamp')}
                    </button>
                    <button onClick={() => requestSort('level')} style={{marginLeft: '10px', padding: '5px 10px'}}>
                        Level{getSortIcon('level')}
                    </button>
                </div>
            </div>

            <div className="mb-4 border-start border-4 border-danger ps-3">
                {/* Заголовок-кнопка */}
                <button
                    className="fw-bold bg-light py-2 px-3 rounded mb-3 border-0 w-100 text-start"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#applyLogs"
                    aria-expanded="true"
                    aria-controls="applyLogs"
                >
                    Apply
                </button>

                {/* Контейнер логов */}
                <div className="collapse show" id="applyLogs">
                    {processedLogs.map((log, index) => (
                        <LogCard key={`${log.timestamp}-${index}`} log={log}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogsView;

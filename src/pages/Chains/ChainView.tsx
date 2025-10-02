import { useParams } from "react-router-dom";
import {useChainsStore} from "../../store/useChainsStore.ts";
import React, {useEffect, useState} from "react";
import {LogCard} from "../../components/logs/LogCard.tsx";
import type {LogLevelType} from "../../shared/types/logs/Log.ts";


export default function ChainView() {
    const { id, filename } = useParams<{ id: string; filename: string }>();
    const { chains, loading, error, fetchChains } = useChainsStore();

    const [levelFilters, setLevelFilters] = useState<Record<string, boolean>>({
        error: true,
        warning: true,
        info: true,
        debug: true,
        trace: true,
    });

    const ALL_LOG_LEVELS: LogLevelType[] = [
        "error",
        "warning",
        "info",
        "debug",
        "trace",
    ];

    const handleFilterToggle = (level: string) => {
        setLevelFilters((prevFilters) => ({
            ...prevFilters,
            [level]: !prevFilters[level],
        }));
    };

    useEffect(() => {
        if (filename) {
            fetchChains(filename);
        }
    }, [fetchChains, filename]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    const selectedChain = chains.find(chain => chain.tf_req_id === id);

    if (!selectedChain) {
        return <div>Цепочка с ID {id} не найдена</div>;
    }

    return (
        <div>
            <div
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    background: "#f0f0f0",
                    borderRadius: "5px",
                }}
            >
                <div style={{marginBottom: "10px"}}>
                    <strong>Filter by Level:</strong>
                    {ALL_LOG_LEVELS.map((level) => (
                        <button
                            key={level}
                            onClick={() => handleFilterToggle(level)}
                            style={{
                                marginLeft: "10px",
                                padding: "5px 10px",
                                border: "1px solid #ccc",
                                backgroundColor: levelFilters[level] ? "#cce5ff" : "#fff",
                                fontWeight: levelFilters[level] ? "bold" : "normal",
                                cursor: "pointer",
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <h2>TF Req ID: {selectedChain.tf_req_id}</h2>
            {selectedChain.Logs.map((log, idx) =>
                levelFilters[log.level] ? <LogCard key={idx} log={log} /> : null
            )}
        </div>
    );
}

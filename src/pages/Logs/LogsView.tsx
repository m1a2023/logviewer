import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { SegmentList } from "../../widgets/logs/SegmentList";
import LoadedLogs from "./LoadedLogs";
import {SearchBar} from "../../widgets/controls/SearchBar"

import { useLogsStore} from "../../store/useLogsStore.ts";
import { useSegmentsStore} from "../../store/useSegmentStore.ts";
import { useChainsStore} from "../../store/useChainsStore.ts";

import type { LogLevelType } from "../../shared/types/logs/Log";

export const LogsView = (): React.ReactElement => {
    const { selectedFile } = useLogsStore();
    const { segments, fetchSegments, loading: segLoading, error: segError } =
        useSegmentsStore();
    const { fetchChains } = useChainsStore();
    const [searchQuery, setSearchQuery] = useState<string>('');


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

    // Загружаем сегменты и chains при выборе файла
    useEffect(() => {
        if (selectedFile) {
            fetchSegments(selectedFile);
            fetchChains(selectedFile);
        }
    }, [selectedFile, fetchSegments, fetchChains]);

    return (
        <div className="p-2">
            <SearchBar setSearchQuery={setSearchQuery} className={"sticky-top"}/>
            <div
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    background: "#f0f0f0",
                    borderRadius: "5px",
                }}
            >
                <div style={{ marginBottom: "10px" }}>
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

            {/* Выбор файла */}
            <LoadedLogs />


            {/* Логи */}
            {segLoading && <Spinner />}
            {segError && <div className="text-danger">{segError}</div>}
            {!segLoading && !segError && (
                <SegmentList segments={segments} levelFilters={levelFilters} searchQuery={searchQuery}/>
            )}
        </div>
    );
};

export default LogsView;

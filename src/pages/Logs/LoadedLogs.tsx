import React, { useEffect, useState } from "react";
import {useLogsStore} from "../../store/useLogsStore.ts";
import {NavLink} from "react-router";

interface FilesResponse {
    filenames: string[];
}

const LoadedLogs: React.FC = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showList, setShowList] = useState(false);

    const { selectedFile, setSelectedFile } = useLogsStore();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/jsonfiles");
                if (!res.ok) throw new Error("Ошибка при загрузке списка файлов");
                const data: FilesResponse = await res.json();
                setFiles(data.filenames);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="container my-3 w-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="fs-5">
          Текущий файл:{" "}
            <strong>{selectedFile ? selectedFile : "Не выбран"}</strong>
            <div>   </div>
            {selectedFile ? <a href={`http://localhost:5173/gantt/${selectedFile}`}><strong>Gantt diagram</strong></a> : ""}

        </span>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowList((prev) => !prev)}
                >
                    Выбрать
                </button>
            </div>

            {loading && <div className="text-muted">Загрузка...</div>}
            {error && <div className="text-danger">{error}</div>}

            {!loading && !error && showList && (
                <div className="list-group">
                    {files.map((file) => (
                        <button
                            key={file}
                            className={`list-group-item list-group-item-action ${
                                selectedFile === file ? "active" : ""
                            }`}
                            onClick={() => {
                                setSelectedFile(file);
                                setShowList(false);
                            }}
                        >
                            {file}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LoadedLogs;

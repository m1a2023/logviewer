import { type ChangeEvent, useState } from "react";
import type {
    FileCaptureProps,
    MultipleFileProps,
} from "../../shared/types/files/FileProps";
import type { Segment } from "../../shared/types/segments/Segment.ts";
import type { RequestChain } from "../../shared/types/logs/RequestChain.ts";

interface MultipleFileInputProps extends MultipleFileProps, FileCaptureProps {
    onUpload?: (segments: Segment[]) => void;
    onUploadChains?: (chains: RequestChain[]) => void;
}

const MultipleFileInput = ({ files, capture, onUpload, onUploadChains }: MultipleFileInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            capture(Array.from(e.target.files));
        } else {
            capture([]);
        }
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            alert("Сначала выберите файлы!");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        try {
            // Выполняем оба запроса параллельно для ускорения
            const [segmentsResponse, chainsResponse] = await Promise.all([
                fetch("http://127.0.0.1:8000/api/parsejson", {
                    method: "POST",
                    body: formData,
                }),
                fetch("http://127.0.0.1:8000/api/parsechainsjson", {
                    method: "POST",
                    body: formData,
                }),
            ]);

            // Обработка segments
            if (!segmentsResponse.ok) {
                throw new Error(`Ошибка загрузки segments: ${segmentsResponse.status}`);
            }
            const segmentsData = await segmentsResponse.json();
            const segments: Segment[] = segmentsData.segments.map((item: any) => ({
                Type: item.Type,
                Id: item.Id,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                ErrorOccurred: item.ErrorOccurred,
                Logs: item.Logs.map((log: any) => ({
                    level: log.level,
                    message: log.message,
                    timestamp: log.timestamp,
                    ...log,
                })),
                SubSegment: item.SubSegment,
            }));

            // Обработка chains
            if (!chainsResponse.ok) {
                throw new Error(`Ошибка загрузки chains: ${chainsResponse.status}`);
            }
            const chainsData = await chainsResponse.json();
            const chains: RequestChain[] = chainsData.chains.map((chainItem: any) => ({
                tf_req_id: chainItem.tf_req_id,
                Logs: chainItem.Logs.map((logEntry: any) => {
                    const line = logEntry.line;
                    return {
                        message: line.message,
                        level: line.level,
                        timestamp: line.timestamp,
                        ...line,
                    };
                }),
            }));

            // Вызов колбэков
            if (onUpload) {
                onUpload(segments);
            }
            if (onUploadChains) {
                onUploadChains(chains);
            }

            console.log("Segments:", segments);
            console.log("Chains:", chains);
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="input-group">
            <label className="form-control cursor-pointer">
                <input
                    type="file"
                    className="display-none"
                    multiple
                    onChange={handleChange}
                />
                {files?.length > 0
                    ? `Selected ${files.length} files`
                    : "Choose Files"}
            </label>

            <div className="m-2">
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default MultipleFileInput;
import React from "react";
import MultipleFileInput from "../../components/files/FileInput";
import { useState, useContext } from "react";
import SelectedFilesList from "./SelectedFilesList";
import { AppContext} from "../../app/AppContext.ts";
import {LogCard} from "../../components/logs/LogCard.tsx";


const DocumentsUpload = (): React.ReactElement => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { segments, setSegments } = useContext(AppContext)?.Segments;
    const {chains, setChains} = useContext(AppContext)?.Chains;


    return (
        <>
            <div className="mb-4">
                <MultipleFileInput
                    files={selectedFiles}
                    capture={setSelectedFiles}
                    onUpload={setSegments}
                    onUploadChains={setChains}
                />
            </div>
            <SelectedFilesList files={selectedFiles} capture={setSelectedFiles} />

            {chains && chains.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Chains</h3>
                    {chains.map(chain => (
                        <div key={chain.tf_req_id}>
                            <h5>Chain: {chain.tf_req_id}</h5>
                            {chain.Logs.map((log, i) => (
                                <LogCard key={`${log.Id || i}`} log={log} />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {segments && segments.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Segments</h3>
                    <pre>{JSON.stringify(segments, null, 2)}</pre>
                </div>
            )}
        </>
    );
};

export default DocumentsUpload;

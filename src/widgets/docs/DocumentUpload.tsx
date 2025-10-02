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
        </>
    );
};

export default DocumentsUpload;

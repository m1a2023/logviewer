import { useParams } from "react-router";
import type { GRPCPluginSegment } from "../../shared/types/segments/Segment";
import { colorMap } from "../logs/SegmentList";
import { LogCard } from "../../components/logs/LogCard";


interface PluginInfoProps {
    segment: GRPCPluginSegment;
}

export const PluginInfo = ({ segment }: PluginInfoProps): React.ReactElement => {
    const { title } = useParams<{ title: string }>();
    const decoded = title ? decodeURIComponent(title) : '';

    return (
        <div className="p-3">
            <h4 className="mb-4">Plugin Info: {decoded || segment.plugin_name}</h4>

            <div className="mb-4">
                <h5>Metadata</h5>
                <pre
                    className="p-3 bg-light rounded"
                    style={{
                        fontFamily: "var(--bs-font-monospace, monospace)",
                        fontSize: "0.9rem",
                        overflowX: "auto",
                    }}
                >
                    {JSON.stringify(segment.metadata, null, 2)}
                </pre>
            </div>

            <div>
                <h5>Filtered Logs ({segment.filtered_logs?.length || 0})</h5>
                {segment.filtered_logs && segment.filtered_logs.length > 0 ? (
                    <div className="list-group">
                        {segment.filtered_logs.map((log) => (
                            <LogCard key={`${log.Id}`} log={log} />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No logs available.</p>
                )}
            </div>
        </div>
    );
}
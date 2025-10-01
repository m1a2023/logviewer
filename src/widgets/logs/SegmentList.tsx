import type { Segment } from "../../shared/types/segments/Segment"

export interface SegmentListProps {
    segments: Segment[]
};

export const SegmentList = (
    { segments }: SegmentListProps
): React.ReactElement => {
    return (
        <div className="list-group">
            {segments.map((seg) => (
                <div>
                    <div className="row">
                        <div className="col">
                            {seg.logs.at(0)?.timestamp}
                        </div>
                        <div className="col w-fit text-start">{seg.id}</div>
                        <div className="col text-start">{seg.type}</div>
                        <div className="col text-start">{seg.logs_start}-{seg.logs_end}</div>
                        <div className="col-md-auto text-end">{"{ "}{seg.logs.at(0)?.msg}...{" }"}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
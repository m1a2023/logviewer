import type { Segment, SubSegment } from "../../shared/types/segments/Segment.ts";
import { LogCard } from "../../components/logs/LogCard.tsx";

interface SegmentListProps {
    segments: Segment[];
    levelFilters: Record<string, boolean>;
}

const colorMap = [
    { border: "border-success", bg: "bg-success-subtle" },
    { border: "border-danger", bg: "bg-danger-subtle" },
    { border: "border-warning", bg: "bg-warning-subtle" },
    { border: "border-primary", bg: "bg-primary-subtle" },
    { border: "border-info", bg: "bg-info-subtle" },
];

// Компонент для отображения SubSegment внутри логов
const SubSegmentBlock = ({
                             subSeg,
                             segIndex,
                             levelFilters,
                         }: {
    subSeg: SubSegment;
    segIndex: number;
    levelFilters: Record<string, boolean>;
}) => {
    const { border, bg } = colorMap[segIndex % colorMap.length];
    const id = `subseg-${segIndex}`;

    return (
        <div key={id} className={`mb-4 border-start border-4 ${border}`}> {/* небольшой отступ слева для вложенности */}
            <button
                className={`fw-bold ${bg} py-1 px-2 mb-1 w-100 text-start rounded`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${id}`}
                aria-expanded="true"
                aria-controls={id}
            >
                <small>{subSeg.Type} (Sub)</small>
            </button>
            <div className="collapse show ps-2" id={id}>
                {subSeg.Logs.map((log, i) =>
                    levelFilters[log.level] ? (
                        <LogCard key={`${log.Id}-${i}`} log={log} />
                    ) : null
                )}
            </div>
        </div>
    );
};

export const SegmentList = ({ segments, levelFilters }: SegmentListProps) => {
    return (
        <div className="list-group">
            {segments.map((seg, segIndex) => {
                const { border, bg } = colorMap[segIndex % colorMap.length];
                const hasSub = !!seg.SubSegment;
                let renderItems: JSX.Element[] = [];

                if (hasSub) {
                    const { StartId, EndId, ...subSegRest } = seg.SubSegment!;
                    let inSubRange = false;
                    let subInserted = false;

                    for (const log of seg.Logs) {
                        if (log.Id >= StartId && log.Id <= EndId) {
                            if (!inSubRange) {
                                // Начало диапазона — вставляем SubSegment один раз
                                inSubRange = true;
                                if (!subInserted) {
                                    renderItems.push(
                                        <SubSegmentBlock
                                            key={`sub-${segIndex}`}
                                            subSeg={seg.SubSegment!}
                                            segIndex={segIndex}
                                            levelFilters={levelFilters}
                                        />
                                    );
                                    subInserted = true;
                                }
                            }
                            // Пропускаем лог — он внутри SubSegment
                            continue;
                        } else {
                            // Вне диапазона — рендерим лог, если проходит фильтр
                            inSubRange = false;
                            if (levelFilters[log.level]) {
                                renderItems.push(
                                    <LogCard key={`${log.Id}`} log={log} />
                                );
                            }
                        }
                    }
                } else {
                    // Нет SubSegment — просто фильтруем логи
                    renderItems = seg.Logs
                        .filter(log => levelFilters[log.level])
                        .map(log => <LogCard key={`${log.Id}`} log={log} />);
                }

                return (
                    <div key={segIndex} className={`mb-4 border-start border-4 ${border}`}>
                        <button
                            className={`fw-bold ${bg} py-2 px-3 mb-3 w-100 text-start rounded-0`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#segment-${segIndex}`}
                            aria-expanded="true"
                            aria-controls={`segment-${segIndex}`}
                        >
                            {seg.Type}
                        </button>

                        <div className="collapse show ps-3" id={`segment-${segIndex}`}>
                            {renderItems}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
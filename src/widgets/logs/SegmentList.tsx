import type { Segment, SubSegment } from "../../shared/types/segments/Segment.ts";
import { LogCard } from "../../components/logs/LogCard.tsx";

interface SegmentListProps {
    segments: Segment[];
    levelFilters: Record<string, boolean>;
    searchQuery: string; // <-- добавлено
}

const colorMap = [
    { border: "border-success", bg: "bg-success-subtle" },
    { border: "border-danger", bg: "bg-danger-subtle" },
    { border: "border-warning", bg: "bg-warning-subtle" },
    { border: "border-primary", bg: "bg-primary-subtle" },
    { border: "border-info", bg: "bg-info-subtle" },
];

// Утилита для сериализации лога в строку
const serializeLog = (log: any): string => {
    try {
        return JSON.stringify(log, (key, value) =>
            value === undefined ? null : value
        ).toLowerCase();
    } catch (e) {
        console.warn("Failed to serialize log", log, e);
        return "";
    }
};

const SubSegmentBlock = ({
                             subSeg,
                             segIndex,
                             levelFilters,
                             searchQuery, // <-- пробрасываем
                         }: {
    subSeg: SubSegment;
    segIndex: number;
    levelFilters: Record<string, boolean>;
    searchQuery: string;
}) => {
    const { border, bg } = colorMap[segIndex % colorMap.length];
    const id = `subseg-${segIndex}`;

    // Фильтруем логи внутри SubSegment
    const filteredLogs = subSeg.Logs.filter(log => {
        const matchesLevel = levelFilters[log.level];
        if (!matchesLevel) return false;
        if (!searchQuery) return true;
        return serializeLog(log).includes(searchQuery.toLowerCase());
    });

    // Если после фильтрации нет логов — не рендерим блок
    if (filteredLogs.length === 0) return null;

    return (
        <div key={id} className={`mb-4 border-start border-4 ${border}`}>
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
                {filteredLogs.map((log, i) => (
                    <LogCard key={`${log.Id}-${i}`} log={log} />
                ))}
            </div>
        </div>
    );
};

export const SegmentList = ({ segments, levelFilters, searchQuery=''}: SegmentListProps) => {
    const normalizedSearch = searchQuery.toLowerCase().trim();

    return (
        <div className="list-group">
            {segments.map((seg, segIndex) => {
                const { border, bg } = colorMap[segIndex % colorMap.length];
                const hasSub = !!seg.SubSegment;
                let renderItems: JSX.Element[] = [];

                if (hasSub) {
                    const { StartId, EndId } = seg.SubSegment!;
                    let inSubRange = false;
                    let subInserted = false;

                    for (const log of seg.Logs) {
                        const matchesLevel = levelFilters[log.level];
                        const matchesSearch = !normalizedSearch || serializeLog(log).includes(normalizedSearch);
                        const shouldShow = matchesLevel && matchesSearch;

                        if (log.Id >= StartId && log.Id <= EndId) {
                            if (!inSubRange) {
                                inSubRange = true;
                                if (!subInserted) {
                                    // Проверим, есть ли хоть один лог в SubSegment, который проходит фильтры
                                    const subHasVisibleLogs = seg.SubSegment!.Logs.some(l =>
                                        levelFilters[l.level] &&
                                        (!normalizedSearch || serializeLog(l).includes(normalizedSearch))
                                    );

                                    if (subHasVisibleLogs) {
                                        renderItems.push(
                                            <SubSegmentBlock
                                                key={`sub-${segIndex}`}
                                                subSeg={seg.SubSegment!}
                                                segIndex={segIndex}
                                                levelFilters={levelFilters}
                                                searchQuery={searchQuery}
                                            />
                                        );
                                        subInserted = true;
                                    }
                                }
                            }
                            continue;
                        } else {
                            inSubRange = false;
                            if (shouldShow) {
                                renderItems.push(
                                    <LogCard key={`${log.Id}`} log={log} />
                                );
                            }
                        }
                    }
                } else {
                    renderItems = seg.Logs
                        .filter(log => {
                            const matchesLevel = levelFilters[log.level];
                            if (!matchesLevel) return false;
                            if (!normalizedSearch) return true;
                            return serializeLog(log).includes(normalizedSearch);
                        })
                        .map(log => <LogCard key={`${log.Id}`} log={log} />);
                }

                // Если нет ни одного элемента для отображения — не рендерим сегмент
                if (renderItems.length === 0) return null;

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
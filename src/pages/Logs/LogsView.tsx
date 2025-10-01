import { useEffect, useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { API_ENDPOINTS } from "../../shared/api/api/endpoints";
import type { DocMultipleResponse } from "../../shared/types/docs/DocumentResponse";
import type { Log } from "../../shared/types/logs/Log";
import type { Segment } from "../../shared/types/segments/Segment";

const segs: Segment[] = [
  {
    id: 1,
    type: "plan",
    logs_start: 0,
    logs: [
      { 
        msg: "Started plan execution", 
        level: "info", 
        timestamp: "2025-10-01T00:00:00Z",
        tags: ["init", "startup"],
        author: "system",
      },
      { 
        msg: "Plan step 1 completed", 
        level: "debug", 
        timestamp: "2025-10-01T00:01:00Z",
        notes: "Step 1 passed without issues",
        related_ids: ["101", "102"],
      },
    ],
  },
  {
    id: 2,
    type: "apply",
    logs_start: 2,
    logs: [
      { 
        msg: "Apply started", 
        level: "INFO", 
        timestamp: "2025-10-01T00:05:00Z",
        tags: ["apply", "start"],
      },
      { 
        msg: "Applied resource X", 
        level: "DEBUG", 
        timestamp: "2025-10-01T00:06:00Z",
        author: "terraform",
      },
      { 
        msg: "Warning: resource Y might be overwritten", 
        level: "warning", 
        timestamp: "2025-10-01T00:07:00Z",
        notes: "Check dependencies before applying",
        related_ids: ["X", "Y"],
      },
    ],
  },
  {
    id: 3,
    type: "PLAN",
    logs_start: 5,
    logs: [
      { 
        msg: "Replanning started", 
        level: "info", 
        timestamp: "2025-10-01T00:10:00Z",
        tags: ["replan"],
      },
      { 
        msg: "Plan step 2 completed", 
        level: "debug", 
        timestamp: "2025-10-01T00:11:00Z",
        notes: "Minor adjustments applied",
      },
    ],
  },
  {
    id: 4,
    type: "APPLY",
    logs_start: 7,
    logs: [
      { 
        msg: "Apply phase 2 started", 
        level: "INFO", 
        timestamp: "2025-10-01T00:15:00Z",
        author: "system",
      },
      { 
        msg: "Error applying resource Z", 
        level: "ERROR", 
        timestamp: "2025-10-01T00:16:00Z",
        notes: ["Check resource permissions", "Retry later"],
        related_ids: ["Z"],
      },
      { 
        msg: "Apply finished with warnings", 
        level: "WARNING", 
        timestamp: "2025-10-01T00:17:00Z",
        tags: ["end", "warning"],
      },
    ],
  },
  {
    id: 5,
    type: "plan",
    logs_start: 10,
    logs: [
      { 
        msg: "Finalizing plan", 
        level: "info", 
        timestamp: "2025-10-01T00:20:00Z",
        author: "planner",
      },
      { 
        msg: "Plan validation passed", 
        level: "INFO", 
        timestamp: "2025-10-01T00:21:00Z",
        tags: ["validation"],
        notes: ["All checks OK"],
      },
    ],
  },
];

const LogsView = (): React.ReactElement => {
	const [segments, setSegments] = useState<Segment[]>(segs);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const SpinnerContainer = () => (
		<div className="position-absolute top-50 start-50 translate-middle">
			<Spinner type="border" color="primary" className="p-4" />
		</div>
	);

	useEffect(() => {
		
		console.log(`API Request ${API_ENDPOINTS}`)
	}, []);

	return (
		<>
			{/* {isLoaded ? <DocumentList documents={documents} /> : <SpinnerContainer />} */}
		</>
	);
};

export default LogsView;

import { useState } from "react"
import { PluginList, type Plugin } from "../../widgets/plugins/PluginList"
import { PluginInfo } from "../../widgets/plugins/PluginInfo";
import type { GRPCPluginSegment } from "../../shared/types/segments/Segment";


export const PluginsView = (): React.ReactElement => {
    const [choosedPlugin, setChoosedPlugin] = useState<Plugin>();

    const plugins = [ 
        {title: "Filter GRPC Plugin", desc: "Filters by assigned field"} ,
        {title: "Plugin Filter Example", desc: "example filter plugin"} ,
        {title: "Plugin Filter Example", desc: "example plugin"} ,
        {title: "Plugin Filter Example", desc: "example filter plugin"} 
    ];

    const pseudoDb_plugin_segment: Record<string, GRPCPluginSegment> = { "Filter GRPC Plugin" : {
            "id": 2,
            "segment_id": 7,
            "filename": "terraform_plan.json",
            "plugin_address": "localhost:50052",
            "plugin_name": "module_filter",
            "success": true,
            "message": "Found 2 logs for filter module=network",
            "metadata": {
                "matched": 2,
                "filter_field": "module",
                "filter_value": "network"
            },
            filtered_logs: [
                {
                    message: "Network module created",
                    level: "info",
                    timestamp: "2025-10-02T13:45:01Z"
                },
                {
                    message: "VPC configured",
                    level: "debug",
                    timestamp: "2025-10-02T13:45:02Z"
                }
            ],
            "created_at": "2025-10-02T13:45:00Z"
            }
        };

    const handleChoosedPlugin = (): GRPCPluginSegment => {
        return pseudoDb_plugin_segment[choosedPlugin?.title!]
    }

    return (
        <div>

            { !choosedPlugin 
                ? <PluginList plugins={plugins} capture={setChoosedPlugin} /> 
                : <PluginInfo segment={handleChoosedPlugin()} /> }
        </div>
    )
}
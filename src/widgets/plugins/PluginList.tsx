import { useNavigate } from "react-router";

export interface Plugin {
    title:  string;
    desc:   string
}

export interface PluginListProps {
    plugins: Plugin[]
    capture: React.Dispatch<React.SetStateAction<Plugin | undefined>>
}

interface PluginCardProps {
    plugin: Plugin
    capture: React.Dispatch<React.SetStateAction<Plugin | undefined>>
}

const PluginCard = ({ plugin, capture }: PluginCardProps): React.ReactElement => {
    const handleClick = () => {
        capture(plugin!)
    };

  return (
    <div className="list-group-item p-3 cursor-pointer" onClick={handleClick}>
      <div className="row">
        <div className="col text-start">{plugin.title}</div>
        <div className="col text-truncate">{plugin.desc}</div>
      </div>
    </div>
  );
};

export const PluginList = ({ plugins, capture }: PluginListProps): React.ReactElement => (
    <div className="container list-group">
    { plugins && plugins.map(( plugin ) => (
            <PluginCard plugin={plugin} capture={capture} />
        )) }
    </div>
)
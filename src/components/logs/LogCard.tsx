import type { LogProps } from "../../shared/types/logs/LogProps";

export interface LogCardProps extends LogProps {
    children?: React.ReactNode;
}

export const LogCard = ({
    children,
}: LogCardProps): React.ReactElement => {

    return <></>
}
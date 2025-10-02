import type {Log} from "./Log.ts";

export interface RequestChain {
    tf_req_id: string;
    Logs: Log[]
}

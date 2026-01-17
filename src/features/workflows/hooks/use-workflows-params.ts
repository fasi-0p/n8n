import {useQueryStates} from "nuqs";
import {workflowsParams} from "../params";

export const useWorkflowsParams=()=>{
    return useQueryStates(workflowsParams);
}

//just like const [param, setParam] = useState(0)
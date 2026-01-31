import {useQueryStates} from "nuqs";
import {executionsParams} from "../params";

export const useExecutionsParams=()=>{
    return useQueryStates(executionsParams);
}

//just like const [param, setParam] = useState(0)
import {useQueryStates} from "nuqs";
import {credentialsParams} from "../params";

export const useCredentialsParams=()=>{
    return useQueryStates(credentialsParams);
}

//just like const [param, setParam] = useState(0)
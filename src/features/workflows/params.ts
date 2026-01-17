import { parseAsInteger, parseAsString } from "nuqs/server";
import { PAGINATION } from "@/config/constants";

export const workflowsParams = {
  page: parseAsInteger //parseAsInt/str is for typesafety from the url
    .withDefault(PAGINATION.DEFAULT_PAGE)  //it basically says, if the url is http//localhost:3000?page=1 
    .withOptions({ clearOnDefault: true }), //then its same as  http//localhost:3000 since page=1 IS the default page
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
};

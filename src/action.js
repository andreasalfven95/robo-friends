import { CHANGE_SEARCH_FIELD } from "./constant";

export const setSearchfield = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})
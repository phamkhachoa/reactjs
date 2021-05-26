import axios from "axios";

export const doSearch = async (obj) => {
    return await axios.post(
        'http://localhost:8057/api/projects/do-search',
        obj
    )
}
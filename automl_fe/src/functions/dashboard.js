import axios from "axios";

export const getRecentProject = async () => {
    let size = 5;
    return await axios.get(
        `http://localhost:8057/api/projects?size=${size}`
    )
}

export const getPercentModel = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/histories/percent`
    )
}
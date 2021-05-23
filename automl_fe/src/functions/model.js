import axios from "axios";

export const getRecentModel = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/models/recent`
    )
}
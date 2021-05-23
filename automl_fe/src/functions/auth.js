import axios from "axios";

export const login = async (username, password) => {
    return await axios.post(
        'http://localhost:8057/api/authenticate',
        {username: username,
        password: password}
    )
}
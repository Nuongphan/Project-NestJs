import { useEffect } from "react"
import {  useNavigate, useParams } from "react-router-dom"

const LoginSuccsess = () => {

    const navigate = useNavigate()
    const { token, userId, status, firstName, lastName } = useParams()
    const user = { id: userId, status: status, firstName: firstName, lastName: lastName }

    useEffect(() => {
        if (token && userId && status) {
            localStorage.setItem("token", token)
            localStorage.setItem("username", JSON.stringify(user))
            navigate("/")
        }}, [token, userId, status, firstName, lastName, navigate])

    if (!token ||!userId ||!status) {
        return (
            <div>
                <h3>Yêu cầu bạn hãy đăng nhập</h3>
            </div>
        )
    }

    return (
        <div>

        </div>
    )

}

export default LoginSuccsess
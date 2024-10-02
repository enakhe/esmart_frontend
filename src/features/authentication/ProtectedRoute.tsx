import type { ReactNode } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")

    if (!token) {
      navigate("/")
    }
  }, [navigate])

  return <>{children}</>
}

export default ProtectedRoute

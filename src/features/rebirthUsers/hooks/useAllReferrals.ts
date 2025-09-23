
import { useEffect, useState } from "react"
import api from "../../../lib/api"
import type { ReferralUser } from "../type"
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage"

export const useAllReferrals = () => {
  const [data, setData] = useState<ReferralUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await api.get("/referrals/list/")

        console.log("list:", response.data)

        setData(response.data.results || [])
      } catch (err: any) {
        setError(extractErrorMessages(err.message) || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

// hooks/useFetchUser.ts
import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"

export function useFetchUser() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = getSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      setUserId(session?.user?.id ?? null)
      setLoading(false)
    }

    fetchUser()
  }, [])

  return { userId, loading }
}
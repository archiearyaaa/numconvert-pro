"use client"

import { useState } from "react"
import { convertToAll } from "@/lib/conversion"

export function useConversion() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  function convert(value: string, base: number) {
    try {
      const data = convertToAll(value, base)
      setResult(data)
      setError("")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { result, error, convert }
}
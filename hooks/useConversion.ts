"use client"

import { useState } from "react"
import { convertToAll } from "@/lib/conversion"

type ConversionResult = {
  binary: string
  octal: string
  decimal: string
  hex: string
} | null

export function useConversion() {
  const [result, setResult] = useState<ConversionResult>(null)
  const [error, setError] = useState<string>("")

  function convert(value: string, base: number) {
    if (!value.trim()) {
      setResult(null)
      setError("")
      return
    }

    const data = convertToAll(value.trim(), base)

    if (!data) {
      setResult(null)
      setError("Input tidak valid untuk basis yang dipilih")
      return
    }

    setResult(data)
    setError("")
  }

  return { result, error, convert }
}
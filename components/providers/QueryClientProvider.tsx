'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import React from 'react'

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
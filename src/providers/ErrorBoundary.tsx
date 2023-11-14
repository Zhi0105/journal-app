"use client"
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface BoundaryInterface {
  error: any
}

export const BoundaryProvider = ({ children }: { children: React.ReactNode }) => {

  const FallbackRender:FC<BoundaryInterface> = ({ error }) => {
    console.log("@BOUNDARY_ERROR:", error)
    return (
      <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    )
  }

  return (
    <ErrorBoundary
      fallbackRender={FallbackRender}
      // onReset={(details) => {
      //   // Reset the state of your app so the error doesn't happen again
      // }}
    >
      {children}
    </ErrorBoundary>
  )
}
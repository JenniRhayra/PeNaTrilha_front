import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="flex-1 bg-[#FFFFFF]">
      <body>{children}</body>
    </html>
  )
}
// import type React from "react"
// import type { Metadata } from "next"
// import { Cairo } from "next/font/google"
// import "./globals.css"

// const cairo = Cairo({
//   variable: "--font-cairo",
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
// })

// export const metadata: Metadata = {
//   title: "ShopFlow - Your Premium Shopping Destination",
//   description:
//     "Discover amazing products at unbeatable prices. Shop the latest trends with free shipping on orders over $50.",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${cairo.variable} font-cairo antialiased`}>{children}</body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/app/components/navbar"

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "ShopFlow - Your Premium Shopping Destination",
  description:
    "Discover amazing products at unbeatable prices. Shop the latest trends with free shipping on orders over $50.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} font-cairo antialiased`}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}

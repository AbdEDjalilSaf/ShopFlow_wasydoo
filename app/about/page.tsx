// import { Navigation } from "@/app/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation /> */}

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">About Us</h1>
          <div className="prose prose-lg text-slate-600">
            <p className="mb-6">
              Welcome to our about page. This demonstrates the navigation component working across different pages with
              smooth transitions and responsive design.
            </p>
            <p className="mb-6">
              The navigation component is built with pure React and Tailwind CSS, providing a clean and modern interface
              without any external UI libraries.
            </p>
            <p>
              Features include responsive design, mobile menu with overlay, smooth animations, and accessibility
              considerations.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

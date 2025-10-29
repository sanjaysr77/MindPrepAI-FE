import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black relative">
      <Toaster />
      {/* Black Basic Grid Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
      background: "#000000",
      backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
     <div className="relative z-10">
        {children}
      </div>
</div>
  )
}


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Users, FileText, Settings, FolderGit2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "Manage Resources", href: "/dashboard/resources", icon: FolderGit2 },
  { name: "Manage Influencers", href: "/dashboard/influencers", icon: Users },
  { name: "Activity Logs", href: "/dashboard/logs", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "fixed h-full bg-[#0D1117] text-white border-r border-gray-800 transition-all duration-300 ease-in-out z-10",
          isOpen ? "w-64" : "w-20",
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          {isOpen ? (
            <h2 className="text-xl font-bold text-cyan-400 transition-all duration-300">Hirecentive</h2>
          ) : (
            <h2 className="text-xl font-bold text-cyan-400 transition-all duration-300 mx-auto">HC</h2>
          )}
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800",
                      pathname === item.href && "bg-cyan-500/10 text-cyan-400",
                      !isOpen && "justify-center px-2",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className={cn("transition-all duration-300", !isOpen && "hidden")}>{item.name}</span>
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right" align="start" alignOffset={-8} sideOffset={0} className="z-[100]">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white",
              !isOpen && "justify-center",
            )}
          >
            {isOpen ? (
              <>
                <ChevronLeft className="w-5 h-5 mr-2" />
                Collapse Sidebar
              </>
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

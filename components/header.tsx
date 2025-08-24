"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Brain } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

function buildLocalePath(pathname: string, nextLocale: string): string {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 0) return `/${nextLocale}`
  const first = parts[0]
  if (first === "en" || first === "ko") {
    parts[0] = nextLocale
    return `/${parts.join("/")}`
  }
  return `/${nextLocale}/${parts.join("/")}`
}

export function Header() {
  const t = useTranslations("app")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (lng: string) => {
    const target = buildLocalePath(pathname || "/", lng)
    router.push(target)
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>{t("title")}</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              {locale === "ko" ? "KO" : "EN"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSelect("en")}>EN</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect("ko")}>KO</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

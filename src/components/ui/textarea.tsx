import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  icon?: LucideIcon
}

function Textarea({ className, icon: Icon, ...props }: TextareaProps) {
  const textarea = (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-input bg-transparent py-3 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        Icon ? "pl-11" : "px-4",
        className
      )}
      {...props}
    />
  )

  if (Icon) {
    return (
      <div className="relative">
        <Icon className="absolute left-3.5 top-5 pointer-events-none text-muted-foreground h-[18px] w-[18px]" />
        {textarea}
      </div>
    )
  }

  return textarea
}

export { Textarea }

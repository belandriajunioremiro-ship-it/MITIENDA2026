import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  icon?: LucideIcon
}

function Input({ className, type, icon: Icon, ...props }: InputProps) {
  const input = (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-[var(--size-input)] w-full min-w-0 rounded-lg border border-input bg-transparent py-1 text-base font-bold shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        Icon ? "pl-11" : "px-4",
        className
      )}
      {...props}
    />
  )

  if (Icon) {
    return (
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary dark:text-white pointer-events-none h-[18px] w-[18px]" />
        {input}
      </div>
    )
  }

  return input
}

export { Input }

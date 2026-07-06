"use client"

import { useState } from "react"
import { Eye, EyeOff, type LucideIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type PasswordInputProps = React.ComponentProps<"input"> & {
  icon?: LucideIcon
}

function PasswordInput({ icon: Icon, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} icon={Icon} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => setShow(!show)}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
      </Button>
    </div>
  )
}

export { PasswordInput }

"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldGroup, Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { ThemeToggle } from "@/components/theme-toggle"
import { PasswordInput } from "@/components/password-input"
import { Mail, Lock, LogIn } from "lucide-react"

export default function LoginPage() {
  return (
    <section className="bg-[url('https://images.shadcnspace.com/assets/backgrounds/login-5.webp')] bg-cover bg-center bg-no-repeat h-full min-h-screen relative overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 z-0 backdrop-grayscale-[0.6] backdrop-blur-sm bg-gradient-to-b from-black/40 to-black/10" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img src="/grid-01.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
      <ThemeToggle />
      <Link href="#" className="fixed top-4 left-4 z-50 flex items-center gap-0">
        <img src="/logo/light.png" alt="TiendaPOS" className="h-12 sm:h-16 drop-shadow-[0_4px_20px_rgb(0_0_0_/_0.7)] drop-shadow-[0_0_40px_rgb(0_0_0_/_0.3)] dark:hidden" />
        <img src="/logo/dark.png" alt="TiendaPOS" className="h-12 sm:h-16 drop-shadow-[0_4px_20px_rgb(0_0_0_/_0.7)] drop-shadow-[0_0_40px_rgb(0_0_0_/_0.3)] hidden dark:block" />
        <span className="text-white font-black text-2xl sm:text-3xl mt-1 -ml-1 [text-shadow:0_4px_20px_rgb(0_0_0_/_0.7),0_0_40px_rgb(0_0_0_/_0.3)]">TiendaPOS</span>
      </Link>
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-8 sm:pt-0 sm:pb-0">
        <div className="w-full max-w-xl mx-auto">
          <Card size="default" className="px-6 py-8 sm:px-10 sm:py-12 border-none gap-6 sm:gap-8 rounded-xl overflow-visible shadow-2xl ring-0 backdrop-blur-sm bg-white/95 dark:bg-zinc-900/95">
            <CardHeader className="p-0 flex gap-4 flex-col">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl font-extrabold">Inicia sesión en tu cuenta</CardTitle>
                <CardDescription className="font-semibold">Conecta Tu Negocio desde cualquier lugar</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <form>
                <FieldGroup>
                  <div className="flex flex-col gap-4">
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                      <FieldContent>
                        <Input id="email" type="email" icon={Mail} placeholder="TiendaPOS@gmail.com" required autoComplete="off" />
                      </FieldContent>
                    </Field>
                    <Field orientation="vertical">
                      <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                      <FieldContent>
                        <PasswordInput id="password" icon={Lock} placeholder="************" required autoComplete="off" />
                      </FieldContent>
                    </Field>
                  </div>
                  <Link href="#" className="text-sm text-card-foreground font-medium text-end block w-full">¿No recuerdas la contraseña?</Link>
                  <Button type="submit" size="lg" className="w-full cursor-pointer"><LogIn className="size-4" /> Iniciar sesión</Button>
                  <div className="text-center text-sm text-muted-foreground">
                    ¿Es tu primera vez en TiendaPOS?{" "}
                    <Link href="/register" className="font-bold text-primary dark:text-white no-underline">Crea una cuenta</Link>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </section>
  )
}

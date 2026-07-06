"use client"

import { useState, useCallback, useRef } from "react"
import Link from "next/link"
import {
  Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight, ArrowLeft, Eye, EyeOff, Check, Info, CheckCircle,
  SkipForward, Store, Pill, Wrench, Warehouse, ShoppingCart,
  UtensilsCrossed, Wine, Package, Shirt, Bike, Printer,
  FileText, FileOutput, Ban, Phone, Globe, User, Mail, Lock,
  Building2, MapPin, Briefcase, DollarSign, Tag, Scan, CreditCard,
} from "lucide-react"

type CountryCode = "VE" | "CO" | "MX" | "EC" | "AR" | "PE" | "CL" | "BO" | "UY"

interface Country {
  code: CountryCode
  name: string
  flag: string
  currency: string
}

const countries: Country[] = [
  { code: "VE", name: "Venezuela", flag: "🇻🇪", currency: "Bs." },
  { code: "CO", name: "Colombia", flag: "🇨🇴", currency: "$" },
  { code: "MX", name: "México", flag: "🇲🇽", currency: "$" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", currency: "$" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", currency: "$" },
  { code: "PE", name: "Perú", flag: "🇵🇪", currency: "S/." },
  { code: "CL", name: "Chile", flag: "🇨🇱", currency: "$" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", currency: "Bs." },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", currency: "$" },
]

const taxIdLabels: Record<CountryCode, string> = {
  VE: "RIF", CO: "NIT", MX: "RFC", EC: "RUC",
  AR: "CUIT", PE: "RUC", CL: "RUT", BO: "NIT", UY: "RUT",
}

const taxRegimes: Record<CountryCode, { value: string; label: string }[]> = {
  VE: [
    { value: "contribuyente", label: "Contribuyente Formal" },
    { value: "no_contribuyente", label: "No Contribuyente" },
    { value: "especial", label: "Contribuyente Especial" },
  ],
  CO: [
    { value: "regimen_comun", label: "Régimen Común" },
    { value: "regimen_simple", label: "Régimen Simple de Tributación" },
  ],
  MX: [
    { value: "persona_fisica", label: "Persona Física" },
    { value: "persona_moral", label: "Persona Moral" },
    { value: "resico", label: "RESICO" },
  ],
  EC: [
    { value: "regimen_general", label: "Régimen General" },
    { value: "rimpe", label: "RIMPE" },
  ],
  AR: [
    { value: "monotributo", label: "Monotributo" },
    { value: "responsable_inscripto", label: "Responsable Inscripto" },
  ],
  PE: [
    { value: "regimen_general", label: "Régimen General" },
    { value: "regimen_mype", label: "Régimen MYPE Tributario" },
    { value: "rus", label: "RUS" },
  ],
  CL: [
    { value: "primer_categoria", label: "Primera Categoría" },
    { value: "segunda_categoria", label: "Segunda Categoría" },
  ],
  BO: [
    { value: "regimen_general", label: "Régimen General" },
    { value: "regimen_simplificado", label: "Régimen Simplificado" },
  ],
  UY: [
    { value: "iva_minimo", label: "IVA Mínimo" },
    { value: "iva_general", label: "IVA General" },
  ],
}

const businessTypes = [
  { value: "farmacia", label: "Farmacia", icon: Pill },
  { value: "ferreteria", label: "Ferretería", icon: Wrench },
  { value: "bodega", label: "Bodega", icon: Warehouse },
  { value: "supermercado", label: "Supermercado", icon: ShoppingCart },
  { value: "restaurante", label: "Restaurante", icon: UtensilsCrossed },
  { value: "licoreria", label: "Licorería", icon: Wine },
  { value: "abarrotes", label: "Abarrotes", icon: Package },
  { value: "ropa", label: "Ropa", icon: Shirt },
  { value: "motos", label: "Motos", icon: Bike },
  { value: "general", label: "General", icon: Store },
]

const printerTypes = [
  { value: "termica_58", label: "Térmica 58mm", icon: Printer },
  { value: "termica_80", label: "Térmica 80mm", icon: Printer },
  { value: "a4", label: "A4", icon: FileText },
  { value: "pdf", label: "PDF", icon: FileOutput },
  { value: "ninguna", label: "Ninguna", icon: Ban },
]

const steps = [
  { number: 1, name: "Cuenta", description: "Tus datos de acceso" },
  { number: 2, name: "Datos Fiscales", description: "Información de tu negocio" },
  { number: 3, name: "Tu Negocio", description: "Configuración inicial" },
  { number: 4, name: "Primer Producto", description: "Opcional — Agrega un producto" },
]

interface FormData {
  nombre: string
  email: string
  password: string
  confirmPassword: string
  pais: string
  identificacionFiscal: string
  razonSocial: string
  nombreComercial: string
  direccion: string
  telefono: string
  emailNegocio: string
  regimenFiscal: string
  actividadEconomica: string
  codigoPostal: string
  tipoNegocio: string
  nombreAlmacen: string
  nombreCaja: string
  tipoImpresora: string
  nombreProducto: string
  sku: string
  codigoBarras: string
  costo: string
  aplicaIva: boolean
  stockInicial: string
  descripcion: string
}

const initialFormData: FormData = {
  nombre: "", email: "", password: "", confirmPassword: "", pais: "",
  identificacionFiscal: "", razonSocial: "", nombreComercial: "", direccion: "",
  telefono: "", emailNegocio: "", regimenFiscal: "", actividadEconomica: "", codigoPostal: "",
  tipoNegocio: "", nombreAlmacen: "", nombreCaja: "", tipoImpresora: "",
  nombreProducto: "", sku: "", codigoBarras: "", costo: "", aplicaIva: true,
  stockInicial: "", descripcion: "",
}

type StepErrors = Partial<Record<keyof FormData, string>>

const stepFields: Record<number, (keyof FormData)[]> = {
  1: ["nombre", "email", "password", "confirmPassword", "pais"],
  2: ["identificacionFiscal", "razonSocial", "direccion"],
  4: ["nombreProducto"],
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<StepErrors>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [animating, setAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const getTaxIdLabel = () => {
    const code = formData.pais as CountryCode
    return taxIdLabels[code] || "Identificación Fiscal"
  }

  const getCurrency = () => {
    const country = countries.find((c) => c.code === formData.pais)
    return country?.currency || "$"
  }

  const getIvaLabel = () => {
    if (formData.pais === "PE") return "¿Aplica IGV?"
    return "¿Aplica IVA?"
  }

  const updateField = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value as never }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [errors])

  const validateStep = (step: number) => {
    const fields = stepFields[step]
    if (!fields) return true
    const newErrors: StepErrors = {}
    for (const field of fields) {
      const value = formData[field]
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[field] = "Este campo es requerido"
      }
    }
    if (step === 1) {
      if (!newErrors.email && formData.email && !validateEmail(formData.email)) {
        newErrors.email = "Formato de email inválido"
      }
      if (!newErrors.password && formData.password && formData.password.length < 8) {
        newErrors.password = "Mínimo 8 caracteres"
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden"
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = () => {
    if (animating) return
    if (!validateStep(currentStep)) return
    if (currentStep < 4) {
      setDirection("next")
      setAnimating(true)
      setTimeout(() => {
        setCurrentStep((s) => s + 1)
        setTimeout(() => setAnimating(false), 50)
      }, 150)
    }
  }

  const goBack = () => {
    if (animating || currentStep <= 1) return
    setDirection("prev")
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep((s) => s - 1)
      setTimeout(() => setAnimating(false), 50)
    }, 150)
  }

  const goToStep = (step: number) => {
    if (animating || step === currentStep || step > currentStep) return
    setDirection("prev")
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(step)
      setTimeout(() => setAnimating(false), 50)
    }, 150)
  }

  const handleComplete = (skip: boolean) => {
    if (!skip) {
      if (!formData.nombreProducto.trim()) {
        setErrors({ nombreProducto: "Este campo es requerido" })
        return
      }
    }
    setIsCompleted(true)
  }

  if (isCompleted) {
    return (
      <section className="bg-[url('https://images.shadcnspace.com/assets/backgrounds/login-5.webp')] bg-cover bg-center bg-no-repeat h-full min-h-screen relative overflow-hidden">
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
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-2xl mx-auto">
              <Card className="px-8 py-12 sm:px-12 border-none gap-6 rounded-xl overflow-visible shadow-2xl ring-0 bg-white dark:bg-zinc-900">
                <div className="flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle className="size-16 text-green-500" />
                  <h2 className="text-2xl font-extrabold">¡Tu cuenta ha sido creada!</h2>
                  <p className="text-muted-foreground">Redirigiendo al panel...</p>
                  <Link href="/login" className="mt-4 w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 h-[var(--size-button)] gap-1.5 px-4 text-sm font-medium whitespace-nowrap transition-all">
                    Ir al Login
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[url('https://images.shadcnspace.com/assets/backgrounds/login-5.webp')] bg-cover bg-center bg-no-repeat h-full min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 backdrop-grayscale-[0.6] backdrop-blur-sm bg-gradient-to-b from-black/40 to-black/10" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img src="/grid-01.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20 sm:pt-0">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="px-8 py-8 sm:px-12 sm:py-10 border-none gap-8 rounded-xl overflow-visible shadow-2xl ring-0 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <Link href="#" className="flex items-center gap-2">
                <img src="/logo/light.png" alt="TiendaPOS" className="h-8 sm:h-10 drop-shadow-[0_4px_20px_rgb(0_0_0_/_0.7)] dark:hidden" />
                <img src="/logo/dark.png" alt="TiendaPOS" className="h-8 sm:h-10 drop-shadow-[0_4px_20px_rgb(0_0_0_/_0.7)] hidden dark:block" />
                <span className="text-foreground font-black text-lg sm:text-xl">TiendaPOS</span>
              </Link>
              <ThemeToggle />
            </div>
          <CardHeader className="p-0">
            <div className="w-full mb-8">
              <div className="relative h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-5">
                {steps.map((step) => {
                  const isActive = step.number === currentStep
                  const isCompleted = step.number < currentStep
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => goToStep(step.number)}
                      className="flex flex-col items-center gap-2.5 transition-all duration-300 group"
                    >
                      <div
                        className={`flex items-center justify-center size-9 rounded-full transition-all duration-300 ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isActive
                              ? "bg-primary text-primary-foreground ring-3 ring-primary/30 scale-110"
                              : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="size-4" />
                        ) : (
                          <span className="text-sm font-bold">{step.number}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium leading-tight transition-all duration-300 ${
                          isActive
                            ? "text-primary opacity-100"
                            : isCompleted
                              ? "text-primary/60 opacity-80"
                              : "text-zinc-400 dark:text-zinc-600 opacity-60"
                        }`}
                      >
                        {step.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 relative overflow-hidden">
            <div
              ref={contentRef}
              className={`transition-all duration-200 ${
                animating
                  ? direction === "next"
                    ? "opacity-0 -translate-x-6"
                    : "opacity-0 translate-x-6"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {currentStep === 1 && <Step1 formData={formData} updateField={updateField} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />}
              {currentStep === 2 && <Step2 formData={formData} updateField={updateField} errors={errors} getTaxIdLabel={getTaxIdLabel} />}
              {currentStep === 3 && <Step3 formData={formData} updateField={updateField} errors={errors} />}
              {currentStep === 4 && <Step4 formData={formData} updateField={updateField} errors={errors} getCurrency={getCurrency} getIvaLabel={getIvaLabel} />}
            </div>
          </CardContent>

          <CardFooter className="p-0 flex justify-between gap-4">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={goBack} disabled={animating}>
                  <ArrowLeft className="size-4 mr-2" /> Atrás
                </Button>
              )}
            </div>
            <div className="flex gap-3 ml-auto">
              {currentStep < 4 && (
                <Button onClick={goNext} disabled={animating}>
                  Continuar <ArrowRight className="size-4 ml-2" />
                </Button>
              )}
              {currentStep === 4 && (
                <>
                  <Button variant="outline" onClick={() => handleComplete(true)} disabled={animating}>
                    <SkipForward className="size-4 mr-2" /> Omitir y terminar
                  </Button>
                  <Button onClick={() => handleComplete(false)} disabled={animating}>
                    <Check className="size-4 mr-2" /> Agregar y terminar
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
        <p className="text-center text-base text-white/80 mt-6 [text-shadow:0_4px_20px_rgb(0_0_0_/_0.7),0_0_40px_rgb(0_0_0_/_0.3)]">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-white font-bold hover:underline [text-shadow:0_4px_20px_rgb(0_0_0_/_0.7),0_0_40px_rgb(0_0_0_/_0.3)]">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  )
}

function Step1({
  formData, updateField, errors, showPassword, setShowPassword,
  showConfirmPassword, setShowConfirmPassword,
}: {
  formData: FormData; updateField: (k: keyof FormData, v: string | boolean) => void
  errors: StepErrors; showPassword: boolean; setShowPassword: (v: boolean) => void
  showConfirmPassword: boolean; setShowConfirmPassword: (v: boolean) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-extrabold">Crea tu cuenta</h2>
        <p className="text-sm text-muted-foreground">Ingresa tus datos personales para comenzar</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div className="sm:col-span-2">
          <Label htmlFor="nombre" className="mb-1.5 block">Nombre completo</Label>
          <Input id="nombre" icon={User} placeholder="Juan Pérez" value={formData.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            className={errors.nombre ? "border-destructive" : ""} />
          {errors.nombre && <p className="text-xs text-destructive mt-1">{errors.nombre}</p>}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email" className="mb-1.5">Correo electrónico</Label>
          <Input id="email" icon={Mail} type="email" placeholder="juan@ejemplo.com"
            value={formData.email} onChange={(e) => updateField("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="password" className="mb-1.5">Contraseña</Label>
          <div className="relative">
            <Input id="password" icon={Lock} type={showPassword ? "text" : "password"} placeholder="Mínimo 8 caracteres"
              value={formData.password} onChange={(e) => updateField("password", e.target.value)}
              className={errors.password ? "border-destructive pr-10" : "pr-10"} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="mb-1.5">Confirmar contraseña</Label>
          <div className="relative">
            <Input id="confirmPassword" icon={Lock} type={showConfirmPassword ? "text" : "password"}
              placeholder="Repite tu contraseña" value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="pais" className="mb-1.5">País</Label>
          <Select value={formData.pais} onValueChange={(v) => v && updateField("pais", v)}>
            <SelectTrigger icon={Globe} className={`w-full ${errors.pais ? "border-destructive" : ""}`}>
              <span className="flex flex-1 text-left items-center gap-2">
                {formData.pais
                  ? (() => { const c = countries.find(ct => ct.code === formData.pais); return c ? `${c.flag} ${c.name}` : formData.pais })()
                  : <span className="text-muted-foreground">Selecciona tu país</span>
                }
              </span>
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  <span className="flex items-center gap-2">{c.flag} {c.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.pais && <p className="text-xs text-destructive mt-1">{errors.pais}</p>}
          <p className="text-xs text-zinc-500 mt-1">Configuraremos todo automáticamente según tu país</p>
        </div>
      </div>
    </div>
  )
}

function Step2({
  formData, updateField, errors, getTaxIdLabel,
}: {
  formData: FormData; updateField: (k: keyof FormData, v: string | boolean) => void
  errors: StepErrors; getTaxIdLabel: () => string;
}) {
  const regimes = formData.pais ? taxRegimes[formData.pais as CountryCode] || [] : []
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div>
          <Label htmlFor="identificacionFiscal" className="mb-1.5">{getTaxIdLabel()}</Label>
          <Input id="identificacionFiscal" icon={CreditCard} placeholder={getTaxIdLabel() === "RIF" ? "J-12345678-9" : "123456789"}
            value={formData.identificacionFiscal}
            onChange={(e) => updateField("identificacionFiscal", e.target.value)}
            className={errors.identificacionFiscal ? "border-destructive" : ""} />
          {errors.identificacionFiscal && <p className="text-xs text-destructive mt-1">{errors.identificacionFiscal}</p>}
        </div>
        <div>
          <Label htmlFor="razonSocial" className="mb-1.5">Razón Social</Label>
          <Input id="razonSocial" icon={Building2} placeholder="Mi Tienda C.A." value={formData.razonSocial}
            onChange={(e) => updateField("razonSocial", e.target.value)}
            className={errors.razonSocial ? "border-destructive" : ""} />
          {errors.razonSocial && <p className="text-xs text-destructive mt-1">{errors.razonSocial}</p>}
        </div>
        <div>
          <Label htmlFor="nombreComercial" className="mb-1.5">Nombre Comercial</Label>
          <Input id="nombreComercial" icon={Store} placeholder="Mi Tienda" value={formData.nombreComercial}
            onChange={(e) => updateField("nombreComercial", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="regimenFiscal" className="mb-1.5">Régimen Fiscal</Label>
          <Select value={formData.regimenFiscal} onValueChange={(v) => v && updateField("regimenFiscal", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona régimen" />
            </SelectTrigger>
            <SelectContent>
              {regimes.map((r) => (
                <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="direccion" className="mb-1.5">Dirección</Label>
          <Textarea id="direccion" placeholder="Av. Principal, Edificio 123, Piso 2"
            value={formData.direccion} onChange={(e) => updateField("direccion", e.target.value)}
            className={errors.direccion ? "border-destructive" : ""} />
          {errors.direccion && <p className="text-xs text-destructive mt-1">{errors.direccion}</p>}
        </div>
        <div>
          <Label htmlFor="telefono" className="mb-1.5">Teléfono</Label>
          <Input id="telefono" icon={Phone} placeholder="+58 412-0000000"
            value={formData.telefono} onChange={(e) => updateField("telefono", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="emailNegocio" className="mb-1.5">Email del negocio</Label>
          <Input id="emailNegocio" icon={Mail} type="email" placeholder="tienda@ejemplo.com"
            value={formData.emailNegocio} onChange={(e) => updateField("emailNegocio", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="actividadEconomica" className="mb-1.5">Actividad Económica</Label>
          <Input id="actividadEconomica" icon={Briefcase} placeholder="Comercio al por menor"
            value={formData.actividadEconomica}
            onChange={(e) => updateField("actividadEconomica", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="codigoPostal" className="mb-1.5">Código Postal</Label>
          <Input id="codigoPostal" icon={MapPin} placeholder="1010" value={formData.codigoPostal}
            onChange={(e) => updateField("codigoPostal", e.target.value)} />
        </div>
      </div>
    </div>
  )
}

function Step3({
  formData, updateField, errors,
}: {
  formData: FormData; updateField: (k: keyof FormData, v: string | boolean) => void
  errors: StepErrors
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-extrabold">Configura tu negocio</h2>
        <p className="text-sm text-muted-foreground">Personaliza cómo funciona tu tienda</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div className="sm:col-span-2">
          <Label htmlFor="tipoNegocio" className="mb-1.5">Tipo de negocio</Label>
          <Select value={formData.tipoNegocio} onValueChange={(v) => v && updateField("tipoNegocio", v)}>
            <SelectTrigger className={errors.tipoNegocio ? "border-destructive" : ""}>
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((bt) => (
                <SelectItem key={bt.value} value={bt.value}>
                  <span className="flex items-center gap-2">
                    <bt.icon className="size-4" /> {bt.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.tipoNegocio && <p className="text-xs text-destructive mt-1">{errors.tipoNegocio}</p>}
        </div>
        <div>
          <Label htmlFor="nombreAlmacen" className="mb-1.5">Nombre del almacén</Label>
          <Input id="nombreAlmacen" icon={Warehouse} placeholder="Depósito Principal" value={formData.nombreAlmacen}
            onChange={(e) => updateField("nombreAlmacen", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="nombreCaja" className="mb-1.5">Nombre de la caja</Label>
          <Input id="nombreCaja" icon={ShoppingCart} placeholder="Caja 1" value={formData.nombreCaja}
            onChange={(e) => updateField("nombreCaja", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="tipoImpresora" className="mb-1.5">Tipo de impresora</Label>
          <Select value={formData.tipoImpresora} onValueChange={(v) => v && updateField("tipoImpresora", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona impresora" />
            </SelectTrigger>
            <SelectContent>
              {printerTypes.map((pt) => (
                <SelectItem key={pt.value} value={pt.value}>
                  <span className="flex items-center gap-2">
                    <pt.icon className="size-4" /> {pt.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function Step4({
  formData, updateField, errors, getCurrency, getIvaLabel,
}: {
  formData: FormData; updateField: (k: keyof FormData, v: string | boolean) => void
  errors: StepErrors; getCurrency: () => string; getIvaLabel: () => string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-extrabold">Agrega tu primer producto</h2>
        <p className="text-sm text-muted-foreground">Puedes omitir este paso y agregarlo después</p>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3 text-sm">
        <Info className="size-4 text-cyan-500 shrink-0" />
        <span className="text-cyan-700 dark:text-cyan-300">Este paso es opcional. Puedes agregar productos después desde el panel.</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <div className="sm:col-span-2">
          <Label htmlFor="nombreProducto" className="mb-1.5">Nombre del producto</Label>
          <Input id="nombreProducto" icon={Package} placeholder="Ej: Harina PAN 1kg"
            value={formData.nombreProducto}
            onChange={(e) => updateField("nombreProducto", e.target.value)}
            className={errors.nombreProducto ? "border-destructive" : ""} />
          {errors.nombreProducto && <p className="text-xs text-destructive mt-1">{errors.nombreProducto}</p>}
        </div>
        <div>
          <Label htmlFor="sku" className="mb-1.5">SKU</Label>
          <Input id="sku" icon={Tag} placeholder="SKU-001" value={formData.sku}
            onChange={(e) => updateField("sku", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="codigoBarras" className="mb-1.5">Código de barras</Label>
          <Input id="codigoBarras" icon={Scan} placeholder="1234567890123" value={formData.codigoBarras}
            onChange={(e) => updateField("codigoBarras", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="costo" className="mb-1.5">Costo</Label>
          <Input id="costo" icon={DollarSign} type="number" placeholder="0.00" value={formData.costo}
            onChange={(e) => updateField("costo", e.target.value)} />
        </div>
        <div className="flex items-end pb-2">
          <div className="flex items-center gap-3">
            <Switch id="aplicaIva" checked={formData.aplicaIva}
              onCheckedChange={(v) => updateField("aplicaIva", v)} />
            <Label htmlFor="aplicaIva" className="text-sm">{getIvaLabel()}</Label>
          </div>
        </div>
        <div>
          <Label htmlFor="stockInicial" className="mb-1.5">Stock inicial</Label>
          <Input id="stockInicial" icon={Package} type="number" placeholder="0" value={formData.stockInicial}
            onChange={(e) => updateField("stockInicial", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="descripcion" className="mb-1.5">Descripción</Label>
          <Textarea id="descripcion" placeholder="Descripción breve del producto"
            value={formData.descripcion} onChange={(e) => updateField("descripcion", e.target.value)} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

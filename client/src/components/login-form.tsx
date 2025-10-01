"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password })
    const res = await fetch("http://localhost:4000/api/v1/auth/login",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        
      },
      body: JSON.stringify({email,password}),
      credentials:"include"
    });

    const data = await res.json()
    console.log(data);
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight text-balance">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your portfolio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-normal">
                Password
              </Label>
              <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Forgot?
              </button>
            </div>
            <div className="relative h-11">
              <Input
                id="password"
                type={showPass ? "text" :"password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-full"
              />
              <Button type="button" onClick={()=>setShowPass(prev=>!prev)} className="absolute right-0 top-0 h-full rounded-l-none">
                {showPass ? <Eye /> :<EyeClosed />}
              </Button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full h-11">
          Sign in
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <button className="text-foreground hover:underline underline-offset-4">Create one</button>
      </div>
    </div>
  )
}

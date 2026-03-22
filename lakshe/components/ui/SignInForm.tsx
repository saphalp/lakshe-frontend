import React from 'react'
import { Button } from "@/components/ui/button"
import { useStep } from "@/context/StepContext"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginForm() {
   const { nextStep } = useStep()

   const handleSubmit = async (e: any) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <Card className='w-full max-w-lg p-6 mx-auto shadow-[0_0_50px_rgba(0,0,0,0.4)]'>
      {/* <CardHeader>
        <CardTitle className='text-xl text-white text-center font-bold'>Create an account</CardTitle>
      </CardHeader> */}
    <form onSubmit={handleSubmit}>
      <CardContent className='text-gray-400'>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className='text-xs font-bold'>EMAIL</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className='text-xs font-bold'>PASSWORD</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className='text-xs font-bold'>CONFIRM PASSWORD</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>       
      </CardContent>
      <CardFooter className="flex-col gap-2 bg-transparent">
        <Button type="submit" className="w-full">
          Continue
        </Button>
        <p className='text-gray-400 text-xs font-bold mt-2'> ALREADY HAVE AN ACCOUNT? <a href="/login" className='text-indigo-700'>LOG IN</a></p>
      </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm

import React from "react";
import { Button } from "@/components/ui/button";
import { useStep } from "@/context/StepContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormData } from "@/context/FormContext";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignInForm() {
  const { formData, updateFormData } = useFormData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: formData.email,
      password: formData.password,
    },
  });

  const { nextStep } = useStep();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateFormData({ email: data.email, password: data.password });
    nextStep();
  };

  return (
    <Card className="w-full max-w-lg p-6 mx-auto shadow-[0_0_50px_rgba(0,0,0,0.4)]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="text-gray-400">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-bold">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-xs font-bold">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is a required field",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-xs font-bold">
                CONFIRM PASSWORD
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 bg-transparent">
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <p className="text-gray-400 text-xs font-bold mt-2">
            ALREADY HAVE AN ACCOUNT?{" "}
            <a href="/login" className="text-indigo-700">
              LOG IN
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default SignInForm;

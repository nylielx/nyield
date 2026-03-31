/**
 * =============================================================================
 * SIGN UP PAGE — User Registration
 * =============================================================================
 *
 * PURPOSE:
 * Full-page registration form where new users create an nYield account.
 *
 * FLOW:
 * 1. User fills in Full Name, Email, Password, Confirm Password
 * 2. Zod validates all fields on submit
 * 3. If valid, calls AuthContext.register() → which calls services/auth.ts
 * 4. On success → redirects to home page
 * 5. On error → shows error message inline
 *
 * ARCHITECTURE:
 * - react-hook-form manages form state and submission
 * - zodResolver connects Zod validation to react-hook-form
 * - useAuth() provides the register function from AuthContext
 * - useNavigate() handles redirect after success
 * =============================================================================
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signUpSchema, type SignUpFormData } from "@/utils/validation";
import { GlassButton } from "@/components/ui/glass-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/component-navbar";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  /* Local UI state for password visibility toggles and messages */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * react-hook-form setup:
   * - register: connects inputs to form state
   * - handleSubmit: validates before calling onSubmit
   * - formState.errors: contains validation error messages
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  /** Called when form passes validation */
  const onSubmit = async (data: SignUpFormData) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const result = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        navigate("/"); // Redirect to home on success
      } else {
        setSubmitError(result.message);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Centered form container */}
      <div className="flex items-center justify-center px-4 pt-28 pb-16">
        <Card className="w-full max-w-md glass-elevated">
          {/* Header */}
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">Create Account</CardTitle>
            <CardDescription>
              Join nYield and optimize your PC performance
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Error banner — shows API errors */}
              {submitError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {submitError}
                </div>
              )}

              {/* Full Name field */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register("fullName")}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password field with show/hide toggle */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    {...register("password")}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit button with loading state */}
              <GlassButton type="submit" className="w-full text-center bg-primary text-primary-foreground" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </GlassButton>
            </form>
          </CardContent>

          {/* Footer with link to sign in */}
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;

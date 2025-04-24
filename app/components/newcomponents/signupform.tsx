import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SocialLogin } from "./SocialLogin";
// Form validation schema
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onLoginClick: () => void;
}

export function SignupForm({ onLoginClick }: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({

    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to your API
      console.log("Form submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] overflow-hidden relative min-h-[916px] w-full  py-[158px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
     <div className="flex flex-row">
        
      <div>
      <h1 className="relative text-5xl font-medium  max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
        Create an Account
      </h1>
      <p className="relative mr-[166px] mt-4 max-md:mr-2.5">
        Already have an account?{" "}
        <button
          className="font-normal text-[#E8AF52] hover:underline"
          onClick={onLoginClick}
        >
          LOGIN
        </button>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-[542px]"
      >
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className={`bg-[rgba(217,217,217,0.18)] w-full text-white px-6 py-[21px] rounded-xl max-md:px-5 outline-none focus:ring-1 focus:ring-[#E8AF52] ${
              errors.email ? "border border-red-500" : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex w-full items-stretch gap-7 text-white flex-wrap mt-5">
          <div className="grow shrink-0 basis-0 w-fit">
            <input
              type="text"
              placeholder="First name"
              className={`bg-[rgba(217,217,217,0.18)] w-full px-6 py-[21px] rounded-xl max-md:px-5 outline-none focus:ring-1 focus:ring-[#E8AF52] ${
                errors.firstName ? "border border-red-500" : ""
              }`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="grow shrink-0 basis-0 w-fit">
            <input
              type="text"
              placeholder="Last name"
              className={`bg-[rgba(217,217,217,0.18)] w-full px-6 py-[21px] rounded-xl max-md:px-5 outline-none focus:ring-1 focus:ring-[#E8AF52] ${
                errors.lastName ? "border border-red-500" : ""
              }`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <input
            type="tel"
            placeholder="Enter your Phone number"
            className={`bg-[rgba(217,217,217,0.18)] w-full text-white px-6 py-[21px] rounded-xl max-md:px-5 outline-none focus:ring-1 focus:ring-[#E8AF52] ${
              errors.phone ? "border border-red-500" : ""
            }`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full rounded border border-[#E8AF52] bg-[rgba(255,255,255,0.02)] gap-2.5 font-normal mt-6 px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating account..." : "Create an account"}
        </button>
      </form>

      <div className="relative w-full max-w-[542px] flex items-center gap-4 my-6">
        <div className="h-px bg-[#23231F] flex-grow"></div>
        <span className="text-white font-normal">Or signup with</span>
        <div className="h-px bg-[#23231F] flex-grow"></div>
      </div>

      <SocialLogin />
      </div> 
      </div>
    </div>
  );
}

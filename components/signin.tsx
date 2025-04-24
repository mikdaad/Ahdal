"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [isEmailSignInAttempted, setIsEmailSignInAttempted] = useState(false);
  const [emailSignInError, setEmailSignInError] = useState<string | null>(null);
  const [canSignInWithGoogle, setCanSignInWithGoogle] = useState(true);

  useEffect(() => {
    // Reset the ability to sign in with Google after a successful navigation
    const handleRouteChange = () => {
      setCanSignInWithGoogle(true);
      setIsEmailSignInAttempted(false);
      setEmailSignInError(null);
    };

    // You'll need to import and use Next.js Router for this in a real app
    // For this example, we'll simulate a route change after a delay
    if (isEmailSignInAttempted && !emailSignInError) {
      const timer = setTimeout(handleRouteChange, 2000); // Simulate navigation delay
      return () => clearTimeout(timer);
    }

    return () => {}; // Cleanup function
  }, [isEmailSignInAttempted, emailSignInError]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingEmail(true);
    setIsEmailSignInAttempted(true);
    setEmailSignInError(null); // Clear any previous email errors

    const result = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}/`,
      redirect: false, // Prevent automatic redirect, handle on client
    });

    setLoadingEmail(false);

    if (result?.error) {
      setEmailSignInError(result.error);
      // Optionally, you might want to re-enable Google sign-in after an email error
      setCanSignInWithGoogle(true);
    } else if (result?.ok) {
      // Email sent successfully, you might want to show a success message
      console.log("Email sent successfully");
      // Optionally, disable Google sign-in temporarily after successful email initiation
      setCanSignInWithGoogle(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (canSignInWithGoogle) {
      signIn("google", { callbackUrl: `${window.location.origin}/` });
    } else {
      // Optionally provide feedback to the user why Google sign-in might be temporarily disabled
      console.log("Google sign-in temporarily disabled after email attempt.");
    }
  };

  return (
    <div className=" m-10  lg:max-w-[418px]  text-xs text-black font-normal">
      <form
        onSubmit={handleEmailSubmit}
        className="bg-[rgba(217,217,217,1)] flex w-full flex-col items-center px-[25px] py-14 rounded-[32px_32px_0px_0px]"
      >
        <h1 className=" text-[18px] lg:text-[24px] font-semibold uppercase">
          Signin
        </h1>

        <p className="text-neutral-600 text-[12px] md:text-[16px] font-light mt-3.5 m-2">
          kindly provide your email to receive the signin link.
        </p>

        <div className="w-full mt-4">
          <div className="bg-[rgba(240,237,255,0.8)] flex items-center gap-2 text-[rgba(28,28,28,1)] px-4 py-[12px] lg:py-[17px] rounded-2xl">
            <img
              src="/email.png"
              alt="Email icon"
              className="w-[18px] aspect-square object-contain shrink-0 opacity-35"
            />
            <input
              id="email"
              name="email"
              placeholder="yourmail@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 mr-2 bg-transparent outline-none"
              aria-label="email input"
            />
          </div>
          {/*emailSignInError && (
            <p className="text-red-500 text-sm mt-1">{emailSignInError}</p>
          )*/}
        </div>

        <button
          disabled={loadingEmail}
          className="bg-white shadow-lg w-[187px] max-w-full font-semibold mt-6 px-[42px] py-[17px] rounded-2xl hover:bg-gray-50 transition-colors flex justify-center items-center"
          type="submit"
        >
          {loadingEmail ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <span>Signin Now</span>
          )}
        </button>

        <div className="mt-6 w-full flex flex-col items-center">
          <div className="flex items-center w-full my-4">
            {/* Left Line */}
            <div className="flex-1 border-t border-[#F0EDFF]"></div>

            {/* Text in the Middle */}
            <div className="text-neutral-600 text-sm mx-4">
              <span className="font-bold text-[rgba(28,28,28,1)]">Signin</span>{" "}
              with Others
            </div>

            {/* Right Line */}
            <div className="flex-1 border-t border-[#F0EDFF]"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={!canSignInWithGoogle}
            className={`border w-full flex justify-center items-center text-[rgba(28,28,28,1)] text-[12px] px-[10px] lg:px-[70px] py-[10px]  lg:py-[11px] rounded-2xl border-[rgba(240,237,255,1)] border-solid hover:bg-gray-50 transition-colors ${
              !canSignInWithGoogle ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Login with Google"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/9d1ebc4b0d4b8e4fbccb9aeda5cbea14be49e44241abca7ec2649315085e1454"
                alt="Google logo"
                className="w-[24px] lg:w-[30px] mr-1 aspect-square object-contain shrink-0"
              />
              <div>
                <span>Signin with </span>
                <span className="font-bold">Google</span>
              </div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
import { useState } from "react";

export function SocialLogin() {
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false,
  });

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsLoading({ ...isLoading, [provider]: true });

    try {
      // In a real application, you would implement OAuth login here
      console.log(`Logging in with ${provider}`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };

  return (
    <div className="relative flex items-stretch gap-7 font-normal whitespace-nowrap flex-wrap w-full max-w-[542px]">
      <button
        onClick={() => handleSocialLogin("google")}
        disabled={isLoading.google}
        className="bg-[rgba(217,217,217,0.18)] flex items-center justify-center gap-4 grow shrink basis-auto px-[51px] py-[21px] rounded-xl max-md:px-5 hover:bg-[rgba(217,217,217,0.25)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/0a7d486de0f4f68a565560c72deb8f6c3cd9f2a7?placeholderIfAbsent=true"
          alt="Google"
          className="aspect-[1] object-contain w-6 shrink-0"
        />
        <span>{isLoading.google ? "Connecting..." : "Google"}</span>
      </button>

      <button
        onClick={() => handleSocialLogin("facebook")}
        disabled={isLoading.facebook}
        className="bg-[rgba(217,217,217,0.18)] flex items-center justify-center gap-4 grow shrink basis-auto px-[51px] py-[21px] rounded-xl max-md:px-5 hover:bg-[rgba(217,217,217,0.25)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/b6cde1188ce4e342d2c84ff99e45fa31220e81d5?placeholderIfAbsent=true"
          alt="Facebook"
          className="aspect-[1] object-contain w-6 shrink-0"
        />
        <span>{isLoading.facebook ? "Connecting..." : "Facebook"}</span>
      </button>
    </div>
  );
}

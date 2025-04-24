'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; // Import signIn
import Image from 'next/image';
import { Loader2 } from 'lucide-react'; // Or your preferred loading icon

// --- Modified SignupForm Props Interface (Adapt your SignupForm component) ---
// You'll need to modify your actual ../components/newcomponents/signupform.tsx
// to accept and use these props.
interface SignupFormProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  error: string | null;
  onLoginClick: () => void;
  inputClasses: string; // Pass down shared styles
  buttonPrimaryClasses: string; // Pass down shared styles
  buttonSecondaryClasses: string; // Pass down shared styles
}

// --- Placeholder SignupForm (Replace with your actual adapted component) ---
// This is just a placeholder to illustrate how props would be used.
// Make sure your actual SignupForm component uses these props correctly.
const PlaceholderSignupForm: React.FC<SignupFormProps> = ({
  name, setName, phone, setPhone, email, setEmail,
  onSubmit, loading, error, onLoginClick,
  inputClasses, buttonPrimaryClasses, buttonSecondaryClasses
}) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <h1 className="text-4xl md:text-5xl font-medium text-center md:text-left">
        Create Your Account
      </h1>
      <p className="text-xl md:text-2xl font-light text-center md:text-left">
        Already have an account?{' '}
        <button
          className="font-normal text-[#E8AF52] hover:underline"
          onClick={onLoginClick}
          type="button"
        >
          LOGIN
        </button>
      </p>
      <form className="space-y-5" onSubmit={onSubmit}>
         <input
           type="text"
           placeholder="Enter your name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           className={inputClasses}
           aria-label="Name"
           required // Add basic validation if desired
         />
         <input
           type="tel" // Use tel for phone numbers
           placeholder="Enter your phone number (optional)"
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
           className={inputClasses}
           aria-label="Phone Number"
         />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          aria-label="Email"
          required
        />
         {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
         {/* Removed Password field */}
        <button type="submit" className={buttonPrimaryClasses} disabled={loading}>
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign Up with Email'}
        </button>
      </form>

      {/* Social Signup Options */}
      <div className="relative mt-8">
         <div className="absolute inset-0 flex items-center" aria-hidden="true">
             <div className="w-full border-t border-white/30"></div>
         </div>
         <div className="relative flex justify-center">
             <span className="bg-black/30 px-4 text-lg text-white/80"> {/* Adjusted background for inner container */}
             Or sign up with
             </span>
         </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
         {/* Make sure the Google button here also calls handleGoogleSignIn */}
         <button type="button" className={buttonSecondaryClasses} onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/` })}>
            {/* Using placeholder SVG for consistency */}
           <GoogleIcon />
           <span>Google</span>
         </button>
         <button type="button" className={buttonSecondaryClasses} disabled> {/* Disabled Facebook */}
           <FacebookIcon />
           <span>Facebook (Coming Soon)</span>
         </button>
       </div>
    </div>
  );
};


// --- Icons (Keep or replace as needed) ---
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.32 17.79V6.21C5.32 6.21 5.32 6.48 5.32 6.48L5.32 6.48L11.92 12L5.32 17.52V17.79Z" fill="#FBBB00"/>
      <path d="M17.08 9.76H11.91L11.92 12L17.08 12C17.08 12 18.1 12 18.37 12.3C18.64 12.61 18.58 14.08 17.68 14.95C16.78 15.82 14.8 16.2 11.92 16.2C9.03999 16.2 6.61999 14.26 5.32 11.99L5.32 12L5.32 12.01C6.61999 9.74 9.03999 7.8 11.92 7.8C13.96 7.8 15.76 8.58 17.08 9.76Z" fill="#518EF8"/>
      <path d="M5.32 17.52L11.92 12L14.8 9.67L11.92 7.8C9.03999 7.8 6.61999 9.74 5.32 12.01L5.32 17.52Z" fill="#28B446"/>
      <path d="M18.32 4.32001C16.49 2.78001 14.3 1.80001 11.92 1.80001C7.4 1.80001 3.43 4.89001 1.34 8.89001L5.32 12.01C6.61999 9.74001 9.03999 7.80001 11.92 7.80001C13.96 7.80001 15.76 8.58001 17.08 9.76001L18.32 8.68001V4.32001Z" fill="#F14336"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#1778F2"/>
    <path d="M16.9659 12.4688H13.703V21H9.4116V12.4688H6V8.78125H9.4116V6.375C9.4116 3.51937 10.926 2 14.1627 2L17.25 2.00875V5.4375H15.1884C13.8311 5.4375 13.7088 6.045 13.7088 7.03125L13.703 8.78125H17.25L16.9659 12.4688Z" fill="#FDFDFD"/>
  </svg>
);


// --- Main Component ---
const Index = () => {
  const [isLogin, setIsLogin] = useState(true); // Start with Login form now

  // Form State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");   // For Signup
  const [phone, setPhone] = useState(""); // For Signup
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null); // Combined error state


  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail(""); // Reset fields when toggling
    setName("");
    setPhone("");
    setAuthError(null); // Clear errors on toggle
  };

  // --- Authentication Handlers ---
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingEmail(true);
    setAuthError(null); // Clear previous errors

    // NOTE: Only email is sent here for the standard email provider.
    // Name and Phone handling happens server-side on first sign-in/user creation.
    const result = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}/`, // Redirect back to home after link click
      redirect: false, // Handle success/error messages manually
    });

    setLoadingEmail(false);

    if (result?.error) {
      // Map common errors or show the raw error
      if (result.error === "EmailSignin" || result.error === "Configuration") {
         setAuthError("Could not send sign-in link. Please try again later.");
      } else if (result.error === "Verification") {
         // This error usually shows on the /auth/error page after clicking a bad link
         setAuthError("The sign-in link is invalid or has expired.");
      }
       else {
        setAuthError(result.error); // Or show a generic message
      }
    } else if (result?.ok && !result.error) {
      // Email sent successfully! Show a message instead of redirecting.
      // You might want a more persistent notification system (e.g., toasts)
      alert(`Sign-in link sent to ${email}! Please check your inbox.`);
      // Optionally redirect or clear form here after success message
      // setEmail(""); // Clear email field maybe?
    }
  };

  const handleGoogleSignIn = () => {
    setAuthError(null); // Clear previous errors
    // Redirects the user to Google sign-in page
    signIn("google", { callbackUrl: `${window.location.origin}/` });
  };

  // Shared input styling
  const inputClasses = "w-full bg-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 text-lg font-light focus:outline-none focus:ring-1 focus:ring-yellow-500/50";
  // Shared button styling
  const buttonPrimaryClasses = "w-full px-12 py-4 bg-transparent rounded border border-[#E8AF52] text-white text-lg font-normal hover:bg-yellow-500/10 transition-colors duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonSecondaryClasses = "w-full px-6 py-4 bg-white/10 rounded-xl text-white text-lg font-normal hover:bg-white/20 transition-colors duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-[#101318] to-[#1a1c21] p-4 sm:p-8 md:p-12 lg:p-20"> {/* Added responsive padding */}
      {/* Outer Border Container */}
      <div className="w-full max-w-7xl border border-[#868686] rounded-[32px] lg:p-12">
        {/* Inner Content Container */}
        <div className="relative flex flex-col overflow-hidden items-stretch bg-black/30 text-white font-light rounded-2xl border border-[#E8AF52]/40 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08)] min-h-[80vh] md:min-h-[700px] lg:min-h-[914px]"> {/* Adjusted min-height */}
          {/* Optional Background Glow */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#F9BF00_0%,_rgba(252,_232,_3,_0)_70%)] blur-3xl pointer-events-none"></div>

          {/* Main Content Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 flex-grow">

            {/* Left Side: Image (Hidden on small screens) */}
            <div className="hidden md:flex items-center justify-center p-8 lg:p-12">
            <div className="relative w-full h-full max-h-[818px] aspect-[675/818] rounded-xl overflow-hidden">
                 {/* Using placeholder, replace src with your actual image URL */}
                <Image
                  // Use a real image source
                  src="/signup.png"
                  alt="Abstract background"
                  layout="fill"
                  objectFit="cover"
                  priority // Load image faster if it's above the fold
                />
              </div>
            </div>

            {/* Right Side: Form Area */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-20">
              {isLogin ? (
                // --- LOGIN FORM ---
                <div className="w-full max-w-md mx-auto space-y-6">
                  <h1 className="text-4xl md:text-5xl font-medium text-center md:text-left">
                    Signin to Your Account
                  </h1>
                 {/* <p className="text-xl md:text-2xl font-light text-center md:text-left">
                    Don`&apos;`t have an account?{' '}
                    <button
                      className="font-normal text-[#E8AF52] hover:underline"
                      onClick={toggleForm}
                      type="button"
                    >
                      SIGN UP
                    </button>
                  </p> */}
                  {/* Actual Login Form */}
                  <form className="space-y-5" onSubmit={handleEmailSubmit}>
                    <input
                       type="email"
                       placeholder="Enter your email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className={inputClasses}
                       aria-label="Email"
                       required
                    />
                     {/* Removed Password field */}
                    {authError && <p className="text-red-400 text-sm mt-1">{authError}</p>}
                    <button type="submit" className={buttonPrimaryClasses} disabled={loadingEmail}>
                      {loadingEmail ? <Loader2 className="animate-spin w-5 h-5" /> : 'Signin with Email'}
                    </button>
                  </form>
                   {/* Social Login Options */}
                   <div className="relative mt-8">
                     <div className="absolute inset-0 flex items-center" aria-hidden="true">
                         <div className="w-full border-t border-white/30"></div>
                     </div>
                     <div className="relative flex justify-center">
                         <span className="bg-black/30 px-4 text-lg text-white/80"> {/* Adjusted background for inner container */}
                         Or login with
                         </span>
                     </div>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                     <button type="button" className={buttonSecondaryClasses} onClick={handleGoogleSignIn}>
                       <img
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/0a7d486de0f4f68a565560c72deb8f6c3cd9f2a7?placeholderIfAbsent=true"
          alt="Google"
          className="aspect-[1] object-contain w-6 shrink-0"
        />
                       <span>Google</span>
                     </button>
                     <button type="button" className={buttonSecondaryClasses} disabled> {/* Disabled Facebook */}
                       <FacebookIcon />
                       <span>Facebook (Coming Soon)</span>
                     </button>
                   </div>
                </div>
              ) : (
                // --- SIGNUP FORM ---
                // Use the placeholder or your actual adapted SignupForm component
                <PlaceholderSignupForm
                   name={name}
                   setName={setName}
                   phone={phone}
                   setPhone={setPhone}
                   email={email}
                   setEmail={setEmail}
                   onSubmit={handleEmailSubmit} // Reusing the same email submit logic
                   loading={loadingEmail}
                   error={authError}
                   onLoginClick={toggleForm}
                   inputClasses={inputClasses}
                   buttonPrimaryClasses={buttonPrimaryClasses}
                   buttonSecondaryClasses={buttonSecondaryClasses}
                 />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
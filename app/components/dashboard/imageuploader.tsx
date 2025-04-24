"use client";

import { CldUploadWidget } from "next-cloudinary";

interface AvatarUploaderProps {
  onUploadSuccess: (urls: string[]) => void;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  return (

    
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result) => {
        console.log("Upload result:", result); // Debugging

        // Ensure result.info is an object
        if (!result.info || typeof result.info !== "object" || result.event !== "success") {
          console.warn("Upload failed or incomplete.");
          return;
        }

        let uploadedUrls: string[] = [];

        // Check if multiple files were uploaded
        if ("files" in result.info && Array.isArray(result.info.files)) {
          uploadedUrls = result.info.files
            .map((file) =>
              typeof file === "object" && "secure_url" in file ? file.secure_url : null
            )
            .filter((url): url is string => url !== null);
        } 
        // Check if a single file was uploaded
        else if ("secure_url" in result.info) {
          uploadedUrls = [result.info.secure_url];
        }

        console.log("Extracted URLs:", uploadedUrls); // Debugging

        if (uploadedUrls.length > 0) {
          setTimeout(() => {
            onUploadSuccess(uploadedUrls);
          }, 500);
        }
      }}
      options={{
        multiple: true, // Enable multiple uploads
        singleUploadAutoClose: false, // Keep uploader open for multiple uploads
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-md bg-blue-600 m-5 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload Images here
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

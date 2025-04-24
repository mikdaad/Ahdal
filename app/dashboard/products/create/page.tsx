"use client";

import { createProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
// Assuming productSchema is updated to include the new category/subcategory fields
import { productSchema } from "@/app/lib/zodSchemas";
import { useState, FormEvent } from "react";

import Image from "next/image";
import { SubmitButton } from "@/app/components/SubmitButtons";

import { AvatarUploader } from "../../../components/dashboard/imageuploader";

// --- New Enums and Types ---
enum Category {
  Doors = "Doors",
  Windows = "Windows",
}

enum DoorOne {
  SingleDoor = "singledoor",
  DoubleDoor = "doubledoor",
  FourFolding = "fourfolding",
  MotherAndSon = "motherandson",
}

enum DoorTwo {
  NormalHandle = "normalhandle",
  FridgeHandle = "fridgehandle",
  BarHandle = "barhandle",
}

enum DoorThree {
  SingleLock = "singlelock",
  MultiLock = "multilock",
  SmartLock = "smartlock",
}

enum windows {
  GI = "GI",
  SS304 = "SS304",
}

// Options arrays excluding 'none'
const doorOneOptions = Object.values(DoorOne);
const doorTwoOptions = Object.values(DoorTwo);
const doorThreeOptions = Object.values(DoorThree);
const windowsOptions = Object.values(windows);
// --- End New Enums and Types ---


export default function ProductCreateRoute() {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useFormState(createProduct, undefined);

  // --- Updated State for Categories/Subcategories ---
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [selectedDoorOne, setSelectedDoorOne] = useState<DoorOne | "">("");
  const [selectedDoorTwo, setSelectedDoorTwo] = useState<DoorTwo | "">("");
  const [selectedDoorThree, setSelectedDoorThree] = useState<DoorThree | "">("");
  const [selectedwindows, setSelectedwindows] = useState<windows | "">("");
  // --- End Updated State ---

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      // IMPORTANT: Ensure productSchema in "@/app/lib/zodSchemas" is updated
      // to validate the new fields: category, doorone, doortwo, doorthree, windows
      // and potentially make the old subcategory optional or remove it.
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // --- Color Selection State and Logic (Unchanged) ---
  const availableColors = [
    "single color", "Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange",
    "Teal", "Brown", "Gray", "Cyan", "Magenta", "Gold", "Silver", "Maroon", "Olive",
    "Navy", "Lime", "Indigo", "Turquoise", "Beige", "Coral"
  ];
  const [customColor, setCustomColor] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const addCustomColor = () => {
    if (customColor && !selectedColors.includes(customColor)) {
      setSelectedColors([...selectedColors, customColor]);
      setCustomColor(""); // Reset input
    }
  };
  // --- End Color Selection ---

  // --- Size Selection State and Logic (Unchanged, assuming still needed) ---
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size) // Remove if already selected
        : [...prevSizes, size] // Add if not selected
    );
  };
  // --- End Size Selection ---


    
    

  // --- Handle Main Category Change ---
  const handleCategoryChange = (value: string) => {
      const newCategory = value as Category;
      setSelectedCategory(newCategory);
      // Reset all subcategory states when main category changes
      setSelectedDoorOne("");
      setSelectedDoorTwo("");
      setSelectedDoorThree("");
      setSelectedwindows("");
  }

  return (
    // Ensure the form submits the action correctly
    <form id={form.id} action={action}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* --- Basic Fields (Name, Images, Description, Prices, Stars, Featured) --- */}
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images.join(',')} // Store image URLs as a comma-separated string or handle as needed
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                 <div>
                    <AvatarUploader

      onUploadSuccess={(url) => {

        console.log("Uploaded URL:", url); // Debugging



        setTimeout(() => {

          setImages((prevImages) => [...prevImages, ...url]);

        }, 20000);



       

      }}

    />

        
                </div>
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

             <div className="flex flex-col gap-3">
              <Label>original price</Label>
              <Input
                key={fields.originalprice.key}
                name={fields.originalprice.name}
                defaultValue={fields.originalprice.initialValue}
                type="number"
                placeholder="₹550"
              />
              <p className="text-red-500">{fields.originalprice.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>discountedprice</Label>
              <Input
                key={fields.discountprice.key}
                name={fields.discountprice.name}
                defaultValue={fields.discountprice.initialValue}
                type="number"
                placeholder="₹550"
              />
              <p className="text-red-500">{fields.discountprice.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>stars</Label>
              <Input
                key={fields.stars.key}
                name={fields.stars.name}
                defaultValue={fields.stars.initialValue}
                type="number"
                placeholder="5"
                max={5}
                min={0}
              />
              <p className="text-red-500">{fields.stars.errors}</p>
            </div>

             <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.ispremium.key}
                name={fields.ispremium.name}
                // Conform manages boolean defaultValues correctly
                defaultChecked={fields.ispremium.initialValue === 'on'}
              />
              <p className="text-red-500">{fields.ispremium.errors}</p>
            </div>
            {/* --- End Basic Fields --- */}


            {/* --- New Category Selection --- */}
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                // Conform field wiring
                key={fields.category.key}
                name={fields.category.name}
                value={selectedCategory} // Controlled component
                onValueChange={handleCategoryChange} // Use the dedicated handler
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.Doors}>Doors</SelectItem>
                  <SelectItem value={Category.Windows}>Windows</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>
            {/* --- End New Category Selection --- */}

            {/* --- Conditional Subcategory Selection --- */}
            {selectedCategory === Category.Doors && (
              <>
                {/* Door One Subcategory */}
                <div className="flex flex-col gap-3">
                  <Label>Door Type</Label>
                  <Select
                    key={fields.category1.key} // Ensure 'doorone' exists in your schema/fields
                    name={fields.category1.name}
                    value={selectedDoorOne}
                    onValueChange={(val) => setSelectedDoorOne(val as DoorOne)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select door type" />
                    </SelectTrigger>
                    <SelectContent>
                      {doorOneOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <p className="text-red-500">{fields.category1?.errors}</p> {/* Optional chaining for safety */}
                </div>

                {/* Door Two Subcategory */}
                <div className="flex flex-col gap-3">
                  <Label>Handle Type</Label>
                  <Select
                    key={fields.category2.key} // Ensure 'doortwo' exists in your schema/fields
                    name={fields.category2.name}
                    value={selectedDoorTwo}
                    onValueChange={(val) => setSelectedDoorTwo(val as DoorTwo)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select handle type" />
                    </SelectTrigger>
                    <SelectContent>
                      {doorTwoOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <p className="text-red-500">{fields.category2?.errors}</p> {/* Optional chaining */}
                </div>

                {/* Door Three Subcategory */}
                <div className="flex flex-col gap-3">
                  <Label>Lock Type</Label>
                  <Select
                    key={fields.category3.key} // Ensure 'doorthree' exists in your schema/fields
                    name={fields.category3.name}
                    value={selectedDoorThree}
                    onValueChange={(val) => setSelectedDoorThree(val as DoorThree)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lock type" />
                    </SelectTrigger>
                    <SelectContent>
                      {doorThreeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <p className="text-red-500">{fields.category3?.errors}</p> {/* Optional chaining */}
                </div>
              </>
            )}

            {selectedCategory === Category.Windows && (
              <div className="flex flex-col gap-3">
                <Label>Window Material</Label>
                <Select
                  // Assuming field name is 'windows' in schema
                  key={fields.category4?.key} // Optional chaining
                  name={fields.category4?.name}
                  value={selectedwindows}
                  onValueChange={(val) => setSelectedwindows(val as windows)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select window material" />
                  </SelectTrigger>
                  <SelectContent>
                    {windowsOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 <p className="text-red-500">{fields.category4?.errors}</p> {/* Optional chaining */}
              </div>
            )}
            {/* --- End Conditional Subcategory Selection --- */}


            {/* --- Colors Selection (Unchanged) --- */}
            <div className="flex flex-col gap-3">
  <Label>Available Colors</Label>

  {/* --- Hidden Input for Colors --- */}
  {/* This input holds the JSON string of selectedColors state */}
  <input
    type="hidden"
    key={fields.colors?.key} // Use optional chaining just in case
    name={fields.colors?.name} // Use optional chaining
    // Serialize the selectedColors array into a JSON string
    value={JSON.stringify(selectedColors)}
    // Conform might manage defaultValue, but state is primary source here
    // defaultValue={JSON.stringify(fields.colors?.initialValue || [])} // Optional: if you had initial values
  />
  {/* --- End Hidden Input --- */}

  <Popover>
   <PopoverTrigger asChild>
     {/* Ensure type="button" so it doesn't submit the form */}
     <Button variant="outline" type="button">
       {selectedColors.length > 0 ? selectedColors.join(", ") : "Select Colors"}
     </Button>
   </PopoverTrigger>
    <PopoverContent className="w-56 max-h-64 overflow-y-auto">
      {/* Render Checkboxes for available colors */}
      {availableColors.map((color) => (
        <div key={color} className="flex items-center gap-2 p-1">
          <Checkbox
            id={`color-${color}`}
            checked={selectedColors.includes(color)}
            // Update state on change
            onChange={(event) => {
                const checked = event.target.checked;
                if (checked) {
                    setSelectedColors((prev) => [...prev, color]);
                } else {
                    setSelectedColors((prev) => prev.filter((c) => c !== color));
                }
            }}
          />
          <Label htmlFor={`color-${color}`} className="cursor-pointer">{color}</Label>
        </div>
      ))}

      {/* Input and Button for Custom Colors */}
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter custom color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent form submission when pressing Enter in this input
              addCustomColor();
            }
          }}
        />
        {/* Ensure type="button" */}
        <Button size="sm" type="button" onClick={addCustomColor}>Add</Button>
      </div>
    </PopoverContent>
  </Popover>

  {/* Display Conform validation errors for the colors field */}
  <p className="text-red-500">{fields.colors?.errors}</p>

</div>
            {/* --- End Colors Selection --- */}

             {/* --- Additional Optional Fields (Unchanged) --- */}
            <h1 className="text-lg font-semibold tracking-tight">Additional information - optional</h1>

            <div className="flex flex-col gap-3">
              <Label>Dimensions</Label>
              <Input
                key={fields.dimensions.key}
                name={fields.dimensions.name}
                defaultValue={fields.dimensions.initialValue}
                type="text"
                placeholder="80 × 35 × 40 cm"
              />
              <p className="text-red-500">{fields.dimensions.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Material</Label>
              <Input
                key={fields.material.key}
                name={fields.material.name}
                defaultValue={fields.material.initialValue}
                type="text"
                placeholder="Premium Leather, Solid Wood" // Update placeholder if needed
              />
              <p className="text-red-500">{fields.material.errors}</p>
            </div>

          

            <div className="flex flex-col gap-3">
              <Label>Warranty</Label>
              <Input
                key={fields.warranty.key}
                name={fields.warranty.name}
                defaultValue={fields.warranty.initialValue}
                type="text"
                placeholder="3 Years"
              />
              <p className="text-red-500">{fields.warranty.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Long description</Label>
               {/* Changed to Textarea for potentially longer content */}
              <Textarea
                key={fields.longdescription.key}
                name={fields.longdescription.name}
                defaultValue={fields.longdescription.initialValue}
                placeholder="More about the product...."
                rows={5} // Adjust rows as needed
              />
              <p className="text-red-500">{fields.longdescription.errors}</p>
            </div>

             <div className="flex flex-col gap-3">
               <Label>In stock</Label>
               <Switch
                 key={fields.isstock.key}
                 name={fields.isstock.name}
                 defaultChecked={fields.isstock.initialValue === 'on'}
               />
               <p className="text-red-500">{fields.isstock.errors}</p>
             </div>
             {/* --- End Additional Optional Fields --- */}

          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
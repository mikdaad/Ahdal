"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../SubmitButtons";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { categories } from "@/app/lib/categories";
import { useState } from "react";
import { useFormState } from "react-dom";
import { editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";




interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    discountprice: number;
    originalprice:number;
    images: string[];
    category: string;
    ispremium: boolean;
    stars:number;
    colors:string[];
    dimensions: string;
    material: string;
    warranty: string;
    longdescription: string;
    isstock: boolean;

    
  };
}



export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [SelectedValues, setSelectedValues] = useState<string[]>([]);
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult: null, // Explicitly setting null
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  

  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };


  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const availableColors = [
    "Single color","Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange",
    "Teal", "Brown", "Gray", "Cyan", "Magenta", "Gold", "Silver", "Maroon", "Olive",
    "Navy", "Lime", "Indigo", "Turquoise", "Beige", "Coral"
  ];
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
  const [customColor, setCustomColor] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);


  
  
  return (
    <form id={form.id}  action={action}>
      <Input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can update your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>is Stock?</Label>
              <Switch
                key={fields.isstock.key}
                name={fields.isstock.name}
                defaultChecked={data.isstock}
              />
              <p className="text-red-500">{fields.isstock.errors}</p>
            </div>

           
            <div className="flex flex-col gap-3">
              <Label>Warranty</Label>
              <Textarea
                key={fields.warranty.key}
                name={fields.warranty.name}
                defaultValue={data.warranty}
                placeholder="update  warranty right here..."
              />
              <p className="text-red-500">{fields.warranty.errors}</p>
            </div>
          

         

            <div className="flex flex-col gap-3">
              <Label>dimensions</Label>
              <Textarea
                key={fields.dimensions.key}
                name={fields.dimensions.name}
                defaultValue={data.dimensions}
                placeholder="update  warranty right here..."
              />
              <p className="text-red-500">{fields.dimensions.errors}</p>
            </div>

            

            <div className="flex flex-col gap-3">
              <Label>material</Label>
              <Textarea
                key={fields.material.key}
                name={fields.material.name}
                defaultValue={data.material}
                placeholder="update  warranty right here..."
              />
              <p className="text-red-500">{fields.material.errors}</p>
              </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Long Description</Label>
              <Textarea
                key={fields.longdescription.key}
                name={fields.longdescription.name}
                defaultValue={data.longdescription}
                placeholder="Write your long description right here..."
              />
              <p className="text-red-500">{fields.longdescription.errors}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Label>discountprice</Label>
              <Input
                key={fields.discountprice.key}
                name={fields.discountprice.name}
                defaultValue={data.discountprice}
                type="number"
                placeholder="₹55"
              />
              <p className="text-red-500">{fields.discountprice.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>originalprice</Label>
              <Input
                key={fields.originalprice.key}
                name={fields.originalprice.name}
                defaultValue={data.originalprice}
                type="number"
                placeholder="₹55"
              />
              <p className="text-red-500">{fields.originalprice.errors}</p>
            </div>

           

            <div className="flex flex-col gap-3">
              <Label>Stars</Label>
              <Input
                key={fields.stars.key}
                name={fields.stars.name}
                defaultValue={data.stars}
                type="number"
                placeholder=""
              />
              <p className="text-red-500">{fields.stars.errors}</p>
            </div>




            
{/* Colors Selection */}
<div className="flex flex-col gap-3">
  <Label>Available Colors</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">
        {selectedColors.length > 0 ? selectedColors.join(", ") : "Select Colors"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-56 max-h-64 overflow-y-auto">
      {availableColors.map((color) => (
        <div key={color} className="flex items-center gap-2">
          <input
  type="checkbox"
  name="color"
  checked={selectedColors.includes(color)}
  onChange={() => toggleColor(color)}
/>

          <span>{color}</span>
        </div>
      ))}
      {/* Custom Color Picker */}
      <div className="mt-2 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter custom color"
          name="customColor" // ✅ Corrected: Properly named input field
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
        />
        <Button size="sm" onClick={addCustomColor}>Add</Button>
      </div>
    </PopoverContent>
  </Popover>

  <input type="hidden" name="colors" value={JSON.stringify(selectedColors)} />
</div>



            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                key={fields.ispremium.key}
                name={fields.ispremium.name}
                defaultChecked={data.ispremium}
              />
              <p className="text-red-500">{fields.ispremium.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Doors">Doors</SelectItem>
                  <SelectItem value="Windows">Windows</SelectItem>
                
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

           

            

           {/*    <div className="flex flex-col gap-3">
      <label className="text-gray-700">Sizes</label>
      <input type="hidden" name="sizes" value={JSON.stringify(SelectedValues)} />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {SelectedValues.length > 0
              ? SelectedValues.join(", ")
              : "Select sizes"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-2 py-1">
              <Checkbox
        checked={SelectedValues.includes(size)}
        onChange={(event) => toggleSelection(size)}
        className="mr-2"
      />
              <span>{size}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>  */}


            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
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
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}

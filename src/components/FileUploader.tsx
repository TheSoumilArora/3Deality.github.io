import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PrintQualityOption {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
}

const printQualityOptions: PrintQualityOption[] = [
  {
    id: "standard",
    name: "0.2 mm Standard Quality",
    description: "Balanced quality and speed",
    priceMultiplier: 1.0,
  },
  {
    id: "medium",
    name: "0.15 mm Medium Quality",
    description: "Better details with moderate print time",
    priceMultiplier: 1.3,
  },
  {
    id: "high",
    name: "0.1 mm High Quality",
    description: "Superior details, longer print time",
    priceMultiplier: 1.6,
  },
  {
    id: "standard-plus",
    name: "0.15 Standard Quality + 0.25 mm Nozzle",
    description: "Good quality with faster print time",
    priceMultiplier: 1.2,
  },
  {
    id: "large-nozzle",
    name: "0.2 mm Standard Quality + 0.6mm Nozzle",
    description: "Faster printing for larger models",
    priceMultiplier: 0.9,
  },
];

const FileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedPrintQuality, setSelectedPrintQuality] = useState<string>("standard");
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [fileUnit, setFileUnit] = useState<string>("mm");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const supportedFormats = ['stl', 'obj', 'stp', 'step', 'igs', 'iges'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension && supportedFormats.includes(extension)) {
      setSelectedFile(file);
      // Generate a random price for demonstration purposes
      const basePrice = Math.floor(Math.random() * 1000) + 500;
      const selectedOption = printQualityOptions.find(option => option.id === selectedPrintQuality);
      const multiplier = selectedOption ? selectedOption.priceMultiplier : 1;
      setEstimatedPrice(basePrice * multiplier);
      toast.success(`File "${file.name}" uploaded successfully!`);
    } else {
      toast.error('Unsupported file format. Please upload STL, OBJ, STP, STEP, IGS or IGES files.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const calculatePrice = () => {
    if (!selectedFile) return;
    
    // In a real implementation, this would use actual file data to calculate
    // Here we're just simulating a price calculation
    const basePrice = Math.floor(Math.random() * 1000) + 500;
    const selectedOption = printQualityOptions.find(option => option.id === selectedPrintQuality);
    const multiplier = selectedOption ? selectedOption.priceMultiplier : 1;
    setEstimatedPrice(basePrice * multiplier);
    toast.success("Price estimate updated!");
  };

  const handlePrintQualityChange = (value: string) => {
    setSelectedPrintQuality(value);
    if (selectedFile) {
      // Recalculate price when print quality changes
      const basePrice = estimatedPrice ? estimatedPrice / (printQualityOptions.find(o => o.id === selectedPrintQuality)?.priceMultiplier || 1) : 500;
      const multiplier = printQualityOptions.find(o => o.id === value)?.priceMultiplier || 1;
      setEstimatedPrice(basePrice * multiplier);
    }
  };

  const handleAddToCart = () => {
    if (!selectedFile || !estimatedPrice) {
      toast.error("Please upload a file and calculate the price first");
      return;
    }
    
    toast.success(`Added custom print job to cart: ₹${estimatedPrice.toFixed(2)}`);
  };

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden border-2 border-dashed border-gray-300">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl font-bold">Upload Your 3D Model</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div 
              className={`flex flex-col items-center justify-center p-6 mb-6 border-2 border-dashed rounded-lg ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'} cursor-pointer`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".stl,.obj,.stp,.step,.igs,.iges"
                className="hidden" 
                onChange={handleFileInput}
              />
              <Upload className="w-12 h-12 mb-4 text-purple-500" />
              <p className="mb-2 text-lg font-semibold text-center text-gray-700">
                {selectedFile ? selectedFile.name : "Upload or drag your 3D model"}
              </p>
              <p className="text-sm text-center text-gray-500">
                Supported formats: STL, OBJ, STP, STEP, IGS, IGES
              </p>
            </div>

            {selectedFile && (
              <>
                <h3 className="mt-8 mb-4 text-lg font-semibold">Print Settings</h3>
                
                <div className="mb-6">
                  <div className="mb-4">
                    <Label htmlFor="fileUnit">File Unit</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="mm"
                          name="fileUnit"
                          value="mm"
                          checked={fileUnit === "mm"}
                          onChange={() => setFileUnit("mm")}
                          className="mr-2"
                        />
                        <label htmlFor="mm">mm</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="inch"
                          name="fileUnit"
                          value="inch"
                          checked={fileUnit === "inch"}
                          onChange={() => setFileUnit("inch")}
                          className="mr-2"
                        />
                        <label htmlFor="inch">inch</label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="rotationX">Rotation X°</Label>
                      <Input
                        id="rotationX"
                        type="number"
                        value={rotationX}
                        onChange={(e) => setRotationX(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rotationY">Rotation Y°</Label>
                      <Input
                        id="rotationY"
                        type="number"
                        value={rotationY}
                        onChange={(e) => setRotationY(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="mb-2 font-medium">Print Quality</h4>
                <RadioGroup value={selectedPrintQuality} onValueChange={handlePrintQualityChange} className="space-y-3">
                  {printQualityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 rounded-md border p-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <span className="font-medium">{option.name}</span>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="p-4 mt-6 text-center bg-gray-100 rounded-lg">
                  {estimatedPrice ? (
                    <div>
                      <p className="mb-2 text-lg font-semibold">Estimated Price</p>
                      <p className="text-2xl font-bold text-purple-600">₹{estimatedPrice.toFixed(2)}</p>
                    </div>
                  ) : (
                    <Button onClick={calculatePrice} className="bg-purple-600 hover:bg-purple-700">
                      Calculate Price
                    </Button>
                  )}
                </div>
              </>
            )}
          </CardContent>
          {selectedFile && estimatedPrice && (
            <CardFooter className="bg-gray-50">
              <Button onClick={handleAddToCart} className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700">
                Add to Cart
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FileUploader;
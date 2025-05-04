import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Upload } from "lucide-react";
import Head from "next/head";

interface FileWithPreview extends File {
    preview?: string;
}

const Quote = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        quantity: "1",
        material: "pla",
        notes: "",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => {
                if (file.name.toLowerCase().endsWith('.stl')) {
                    return file;
                } else {
                    alert('Please upload only STL files');
                    return null;
                }
            }).filter((file): file is File => file !== null);

            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ formData, files });
        // Handle form submission
    };

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>3Deality | Get a 3D Printing Quote</title>
                <meta name="description" content="Upload your STL files and get a custom 3D printing quote with fast turnaround and quality materials. Choose from PLA, ABS, PETG, and TPU." />
                <meta name="keywords" content="3D printing quote, STL file upload, custom 3D prints, rapid prototyping, 3Deality, additive manufacturing" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Open Graph */}
                <meta property="og:title" content="Get a 3D Printing Quote - 3Deality STL Upload" />
                <meta property="og:description" content="Upload your STL files and get a custom 3D printing quote with high-quality materials and precision manufacturing." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.3deality.com/quote" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="pt-20 pb-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <p className="mt-4 text-lg text-gray-600">
                                Upload your STL files and we&apos;ll provide you with a custom quote
                            </p>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* File Upload Section */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Upload STL Files
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            accept=".stl"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="cursor-pointer flex flex-col items-center"
                                        >
                                            <Upload className="h-12 w-12 text-gray-400 mb-3" />
                                            <span className="text-gray-600">
                                                Drag and drop your STL files here, or click to browse
                                            </span>
                                        </label>
                                    </div>

                                    {/* File List */}
                                    {files.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                Uploaded Files:
                                            </h4>
                                            <div className="space-y-2">
                                                {files.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                                    >
                                                        <span className="text-sm text-gray-600">
                                                            {file.name}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFile(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Print Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={(e) =>
                                                setFormData({ ...formData, quantity: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="material"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Material
                                        </label>
                                        <select
                                            id="material"
                                            value={formData.material}
                                            onChange={(e) =>
                                                setFormData({ ...formData, material: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        >
                                            <option value="pla">PLA</option>
                                            <option value="abs">ABS</option>
                                            <option value="petg">PETG</option>
                                            <option value="tpu">TPU</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label
                                        htmlFor="notes"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Additional Notes
                                    </label>
                                    <textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Request Quote
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quote;
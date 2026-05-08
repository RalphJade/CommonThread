import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        type: '',
        image_url: '',
        active: true,
        featured: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <>
            <Head title="Create Product" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <a href={route('admin.products.index')} className="p-2 hover:bg-gray-100 rounded">
                        <ArrowLeft className="w-5 h-5" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Add a new product to your store</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product name"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Description *</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={5}
                                    placeholder="Enter product description"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Price *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                </div>

                                {/* Type */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Type *</label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a type</option>
                                        <option value="shirts">Shirts</option>
                                        <option value="pants">Pants</option>
                                        <option value="accessories">Accessories</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={data.image_url}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.active}
                                        onChange={(e) => setData('active', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="font-medium">Active</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="font-medium">Featured</span>
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Product'}
                                </Button>
                                <a href={route('admin.products.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

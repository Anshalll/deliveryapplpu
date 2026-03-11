import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Save, AlertCircle, CheckCircle, Package, Upload, X, Image as ImageIcon } from 'lucide-react';
import NotFound from './Notfound'

export default function EditProductPage() {

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const { id } = useParams()
  const [formData, setFormData] = useState({})
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  
  useEffect(() => {

    const getdata = async () => {
      const response = await fetch("http://localhost:5000/api/category")
      const data = await response.json()
      setCategories(data.data)
    }

    if (categories.length === 0) {
      getdata();
    }
  }, [categories])

  useEffect(() => {
    if (!id) {
      return <NotFound />
    }

    const getitemdata = async () => {

      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/items/${id}`)
      if (!response.ok) {
        alert("An error occured while fetching product data!")
      }

      const data = await response.json()

      setFormData(data.data)



    }
    getitemdata()
  }, [id])



  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true
    }));
    setSelectedImages([...selectedImages, ...newImages]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const updated = [...prev];
      if (updated[index].preview.startsWith('blob:')) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/`)
  };
  
  const stockStatus =  Number(formData.quantity) > 50 ? 'High' : Number(formData.quantity) > 20 ? 'Medium' : 'Low';
  const stockColor = Number(formData.quantity) > 50 ? 'bg-green-500/20 text-green-400' : Number(formData.quantity) > 20 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400';

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

              <div>
                <h1 className="text-3xl font-bold text-white">Edit Product</h1>
                <p className="text-gray-400 mt-1">{formData.name}</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-medium">Product updated successfully!</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
              {['basic', 'pricing', 'stock', 'images'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded font-medium transition-all capitalize ${activeTab === tab
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Basic Information */}
            {activeTab === 'basic' && (
              <div className="space-y-6 bg-zinc-900 rounded-xl border border-zinc-800 p-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Basic Information
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Category
                    </label>
                   <select className='w-full text-white  px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all' name="category" onChange={handleInputChange} id="category" value={formData?.category || ''}>
                    <option value="">Select a Category</option>
                    {categories.map((value, index) => (
                      
                      <option  key={index} value={value.id}>{value.name}</option>
                    ))}
                   </select>
                    
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Description
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Discontinued</option>
                  </select>
                </div>
              </div>
            )}

            {/* Pricing */}
            {activeTab === 'pricing' && (
              <div className="space-y-6 bg-zinc-900 rounded-xl border border-zinc-800 p-8">
                <h2 className="text-xl font-bold text-white">Pricing Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Selling Price (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                    </div>
                  </div>

                </div>


              </div>
            )}

            {/* Stock */}
            {activeTab === 'stock' && (
              <div className="space-y-6 bg-zinc-900 rounded-xl border border-zinc-800 p-8">
                <h2 className="text-xl font-bold text-white">Stock Management</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Current Stock (units)
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border ${stockColor}`}>
                    <p className="text-xs font-medium opacity-75 mb-1">Stock Status</p>
                    <p className="text-lg font-bold capitalize">{stockStatus}</p>
                  </div>
                  <div className="p-4 rounded-lg border border-zinc-700 bg-zinc-800">
                    <p className="text-xs text-gray-400 font-medium mb-1">Total Value</p>
                    <p className="text-lg font-bold text-white">
                      ₹{((Number(formData.quantity) || 0) * (Number(formData.price) || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-300">
                    Low stock alerts will be triggered when quantity drops below 20 units.
                  </p>
                </div>
              </div>
            )}

            {/* Images */}
            {activeTab === 'images' && (
              <div className="space-y-6 bg-zinc-900 rounded-xl border border-zinc-800 p-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-orange-500" />
                  Product Images
                </h2>

                {/* Current Images */}
                {formData.images && formData.images.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Current Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={`${import.meta.env.VITE_APP_CLOUD_FRONT_URL}${img}`} 
                            alt={`Current ${index}`}
                            className="w-40 h-40 object-contain rounded-lg border border-zinc-700"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-300">Current Image</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Add New Images
                  </label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300 font-medium">Drag and drop images or click to browse</p>
                    <p className="text-gray-500 text-sm mt-1">Supported formats: JPG, PNG, GIF</p>
                  </div>
                </div>

                {/* Selected New Images Preview */}
                {selectedImages.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      New Images ({selectedImages.length})
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img.preview} 
                            alt={`New ${index}`}
                            className="w-full h-40 object-cover rounded-lg border border-orange-500/50"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-orange-500 px-2 py-1 rounded text-xs text-white">
                            New
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-300">
                    You can add multiple images. All images will be included in the update when you save.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Quick Summary</h3>

              <div className="space-y-4">

              {categories?.length >  0  &&   <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{categories?.filter((value) => value.id ===  Number(formData.category))[0]?.name } </span>
                </div>}
                <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${formData.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                    }`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Stock</span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${stockColor}`}>
                    {formData.quantity || 0} units
                  </span>
                </div>
              </div>
            </div>

                    
          </div>
        </div>
      </div>
    </div>
  );
}

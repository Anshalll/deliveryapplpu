'use client';

import { useState } from 'react';

import { ArrowLeft, Save, AlertCircle, CheckCircle, Package } from 'lucide-react';

export default function EditProductPage() {
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Margherita Pizza',
    sku: 'PIZZA001',
    category: 'Main Course',
    quantity: 45,
    price: 12.99,
    description: 'Classic margherita pizza with fresh mozzarella and basil',
    cost: 5.50,
    margin: 'High',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1200);
  };

  const stockStatus = formData.quantity > 50 ? 'High' : formData.quantity > 20 ? 'Medium' : 'Low';
  const stockColor = formData.quantity > 50 ? 'bg-green-500/20 text-green-400' : formData.quantity > 20 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400';

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
              {['basic', 'pricing', 'stock'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded font-medium transition-all capitalize ${
                    activeTab === tab
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
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
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
                      Selling Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Cost Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Profit Margin</p>
                  <p className="text-3xl font-bold text-orange-400">
                    {((((formData.price - formData.cost) / formData.price) * 100) || 0).toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Profit per unit: ${(formData.price - formData.cost).toFixed(2)}
                  </p>
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
                      ${(formData.quantity * formData.price).toFixed(2)}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Quick Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                  <span className="text-gray-400">SKU</span>
                  <span className="font-mono text-white">{formData.sku}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{formData.category}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-700">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    formData.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {formData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Stock</span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${stockColor}`}>
                    {formData.quantity} units
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-6">Pricing Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Selling Price</span>
                  <span className="font-bold text-white">${formData.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Cost Price</span>
                  <span className="font-bold text-white">${formData.cost.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-orange-500/20 flex justify-between">
                  <span className="text-gray-300">Profit/Unit</span>
                  <span className="font-bold text-orange-400">${(formData.price - formData.cost).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-300">Margin %</span>
                  <span className="font-bold text-orange-400">
                    {((((formData.price - formData.cost) / formData.price) * 100) || 0).toFixed(1)}%
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

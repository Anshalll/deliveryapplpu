'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  ChevronDown,
  Package,
  FolderPlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function InventoryPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages' },
    { id: 2, name: 'Snacks' },
  ]);
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { id: 1, categoryId: 1, name: 'Coffee', sku: 'BEV001', img: "https://static.vecteezy.com/system/resources/thumbnails/023/742/327/small/latte-coffee-isolated-illustration-ai-generative-free-png.png" ,  quantity: 50, price: 2.5 },
    { id: 2, categoryId: 1, name: 'Tea', sku: 'BEV002', img: "https://static.vecteezy.com/system/resources/thumbnails/023/742/327/small/latte-coffee-isolated-illustration-ai-generative-free-png.png" ,  quantity: 30, price: 1.5 },
    { id: 3, categoryId: 2, name: 'Chips', sku: 'SNK001', img: "https://static.vecteezy.com/system/resources/thumbnails/023/742/327/small/latte-coffee-isolated-illustration-ai-generative-free-png.png" ,  quantity: 100, price: 1.2 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: '',
  });

  // Add new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Math.max(...categories.map((c) => c.id), 0) + 1,
          name: newCategoryName,
        },
      ]);
      setNewCategoryName('');
      setShowAddCategoryModal(false);
    }
  };

  // Add new item
  const handleAddItem = () => {
    if (formData.name && formData.sku && formData.quantity && formData.price) {
      setItems([
        ...items,
        {
          id: Math.max(...items.map((i) => i.id), 0) + 1,
          categoryId: selectedCategory,
          name: formData.name,
          sku: formData.sku,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
        },
      ]);
      setFormData({ name: '', sku: '', quantity: '', price: '' });
      setShowAddItemModal(false);
    }
  };

  // Update item
  const handleUpdateItem = () => {
    if (formData.name && formData.sku && formData.quantity && formData.price) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                sku: formData.sku,
                quantity: parseInt(formData.quantity),
                price: parseFloat(formData.price),
              }
            : item
        )
      );
      setFormData({ name: '', sku: '', quantity: '', price: '' });
      setEditingItem(null);
      setShowEditItemModal(false);
    }
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Delete category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    setItems(items.filter((item) => item.categoryId !== id));
    if (selectedCategory === id) {
      setSelectedCategory(categories[0]?.id || null);
    }
  };

  // Edit item
  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      sku: item.sku,
      quantity: item.quantity.toString(),
      price: item.price.toString(),
    });
    setShowEditItemModal(true);
  };

  // Filter items by category and search
  const filteredItems = items.filter(
    (item) =>
      item.categoryId === selectedCategory &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold">Inventory Management</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                <FolderPlus className="w-5 h-5" />
                Add Category
              </button>
              <button
                onClick={() => {
                  setFormData({ name: '', sku: '', quantity: '', price: '' });
                  setShowAddItemModal(true);
                }}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4">
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between"
                    >
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex-1 text-left px-3 py-2 rounded-lg transition duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-orange-600 text-white font-semibold'
                            : 'hover:bg-zinc-800 text-gray-300'
                        }`}
                      >
                        {category.name}
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1 text-red-500 hover:bg-red-500 hover:bg-opacity-20 rounded transition duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No categories found</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Items */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search items by name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                {filteredItems.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">Image</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">Item Name</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">SKU</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">Quantity</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">Price</th>
                        <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-zinc-800 hover:bg-zinc-800 transition duration-200"
                        >
                          <td className="px-4 py-3">
                            <img src={item.img} alt={item.name} className="w-10 h-10 object-cover rounded" />
                          </td>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3 text-gray-400">{item.sku}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                item.quantity > 20
                                  ? ' text-green-400'
                                  : item.quantity > 10
                                  ? 'text-yellow-400'
                                  : ' text-red-400'
                              }`}
                            >
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold">₹{item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => navigate(`/updateitem/${item.id}`)}
                                className="p-2 text-blue-500 hover:bg-blue-500 hover:bg-opacity-20 rounded transition duration-200"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-500 hover:bg-opacity-20 rounded transition duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No items found in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Category</h2>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition duration-200"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Item</h2>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Item name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddItemModal(false)}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition duration-200"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Item</h2>
              <button
                onClick={() => setShowEditItemModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Item name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="text"
                placeholder="SKU"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditItemModal(false)}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate(`/updateitem/${editingItem.id}`)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
              >
                Update Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

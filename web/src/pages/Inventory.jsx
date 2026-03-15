import { toast, Toaster } from 'react-hot-toast'

import { useEffect, useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  Package,
  FolderPlus,
} from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
export default function InventoryPage() {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);



  useEffect(() => {

    const getdata = async () => {
      const response = await fetch("http://localhost:5000/api/category")
      const data = await response.json()
      setCategories(data.data)
      if (data.data && data.data.length > 0) {
        setSelectedCategory(data.data[0].id);
      }
    }

    if (categories.length === 0) {
      getdata();
    }
  }, [categories])

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Category States
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const SuccessToast = (message) => {
    toast.success(message, {
      duration: 1500,
      position: "top-right",
    });
  };

  const ErrorToast = (message) => {
    toast.error(message, {
      duration: 1500,
      position: "top-right",
    });
  };


  useEffect(() => {
    if (!selectedCategory) return; // Prevent premature fetch

    const getitemsdata = async () => {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/getitems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ catid: selectedCategory })
      })

      if (!response.ok) {
        ErrorToast("Error fetching data!");
      }

      const data = await response.json()
      if (data.success) {

        setItems(data.data)
      }

    }

    getitemsdata();

  }, [selectedCategory])


  const [formData, setFormData] = useState({
    name: '',

    quantity: '',
    price: '',
  });

  // Add new category
  const handleAddCategory = () => {

    const handleAddNewCategory = async () => {
      const response = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newCategoryName })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("An error occured!")
        return;
      }

      if (data.success) {
        SuccessToast("New category creaated!");
        setNewCategoryName('');
        setShowAddCategoryModal(false);




      }
      else {
        ErrorToast("Failed to add new category!");
      }


    }



    if (newCategoryName.trim()) {
      setCategories([
        ...categories,
        {
          id: Math.max(...categories.map((c) => c.id), 0) + 1,
          name: newCategoryName,
        },
      ]);
      handleAddNewCategory();

    }
  };

  // Add new item
  const handleAddItem = () => {
    if (formData.name && formData.quantity && formData.price) {
      setItems([
        ...items,
        {
          id: Math.max(...items.map((i) => i.id), 0) + 1,
          categoryId: selectedCategory,
          name: formData.name,

          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
        },
      ]);
      setFormData({ name: '', quantity: '', price: '' });
      setShowAddItemModal(false);
    }
  };



  // Delete item
  const handleDeleteItem = async (uniqueid) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/items/${uniqueid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          SuccessToast("Item deleted successfully!");
          setItems(items.filter((item) => item.uniqueid !== uniqueid));
        } else {
          ErrorToast(data.error || "Failed to delete item!");
        }
      } else {
        ErrorToast("Failed to delete item!");
      }
    } catch (err) {
      ErrorToast("An error occurred while deleting item!");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/category/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        SuccessToast("Category deleted successfully!");
        setCategories(categories.filter((cat) => cat.id !== id));
        // Only reset items and selection if the active category was deleted
        if (selectedCategory === id) {
          setItems([]);
          setSelectedCategory(categories[0]?.id || null);
        }
      } else {
        ErrorToast(data.error || "Failed to delete category!");
      }
    } catch (err) {
      console.error(err);
      ErrorToast("An error occurred while deleting the category!");
    }
  };




  // Edit Category functionality
  const handleEditCategory = async () => {
    if (!editCategoryName.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/category/${editCategoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: editCategoryName })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        SuccessToast("Category updated successfully!");
        setCategories(categories.map(cat => cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat));
        setShowEditCategoryModal(false);
        setActiveDropdown(null);
      } else {
        ErrorToast(data.error || "Failed to update category!");
      }
    } catch (err) {
      console.error(err);
      ErrorToast("An error occurred while updating the category!");
    }
  };

  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
  );


  const HandleSelectedCategory = async (id) => {


    setSelectedCategory(id)
    const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/getitems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ catid: selectedCategory })
    })

    if (!response.ok) {
      ErrorToast("Error fetching data!");
    }

    const data = await response.json()
    if (data.success) {

      setItems(data.data)
    }


  }



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Toaster />
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
              <Link to={"/createitem"}

                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </Link>
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
              
              {/* Category Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition duration-200"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto w-full">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between relative ${activeDropdown === category.id ? 'z-50' : 'z-0'}`}
                    >
                      <button
                        onClick={() => HandleSelectedCategory(category.id)}
                        className={`flex-1 text-left px-3 py-2 rounded-lg transition duration-200 ${selectedCategory === category.id
                          ? 'bg-orange-600 text-white font-semibold'
                          : 'hover:bg-zinc-800 text-gray-300'
                          }`}
                      >
                        {category.name}
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditCategoryId(category.id);
                            setEditCategoryName(category.name);
                            setShowEditCategoryModal(true);
                          }}
                          className="p-1 text-blue-500 hover:bg-blue-500 hover:bg-opacity-20 rounded transition duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-1 text-red-500 hover:bg-red-500 hover:bg-opacity-20 rounded transition duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                      placeholder="Search items by name..."
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
                          <th className="text-left px-4 py-3 text-gray-400 font-semibold">Quantity</th>
                          <th className="text-left px-4 py-3 text-gray-400 font-semibold">Price</th>
                          <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item, key) => (

                          <tr
                            key={key}
                            className="border-b border-zinc-800 hover:bg-zinc-800 transition duration-200"
                          >
                            <td className="px-4 py-3">

                              <img src={`${import.meta.env.VITE_APP_CLOUD_FRONT_URL}${item.images[0]}`} alt={item.name} className="w-10 h-10 object-cover rounded" />
                            </td>
                            <td className="px-4 py-3">{item.name}</td>

                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${item.quantity > 20
                                  ? ' text-green-400'
                                  : item.quantity > 10
                                    ? 'text-yellow-400'
                                    : ' text-red-400'
                                  }`}
                              >
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-semibold">₹{Number(item?.price)}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => navigate(`/updateitem/${item.uniqueid}`)}
                                  className="p-2 text-blue-500 hover:bg-blue-500 hover:bg-opacity-20 rounded transition duration-200"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item.uniqueid)}
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

      {/* Edit Category Modal */}
      {showEditCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Category</h2>
              <button
                onClick={() => setShowEditCategoryModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Category name"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition duration-200 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditCategoryModal(false)}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCategory}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

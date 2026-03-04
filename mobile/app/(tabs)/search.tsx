import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useMemo } from 'react'
import SearchComponent from '@/components/SearchComponent'

// Dummy data for hot searches
const HOT_SEARCHES = ['Biryani', 'Pizza', 'Burger', 'Chinese', 'Pasta', 'Dosa', 'Samosa', 'Cake']

// Dummy data for search history
const SEARCH_HISTORY = ['Biryani', 'Coffee', 'Pizza', 'Burger', 'Dosa']

// Dummy restaurant/food items data
const ALL_ITEMS = [
  { id: 1, name: 'Chicken Biryani', category: 'Rice Dishes', price: '$12.99' },
  { id: 2, name: 'Veggie Biryani', category: 'Rice Dishes', price: '$10.99' },
  { id: 3, name: 'Cheese Pizza', category: 'Pizza', price: '$14.99' },
  { id: 4, name: 'Pepperoni Pizza', category: 'Pizza', price: '$15.99' },
  { id: 5, name: 'Beef Burger', category: 'Burgers', price: '$9.99' },
  { id: 6, name: 'Chicken Burger', category: 'Burgers', price: '$8.99' },
  { id: 7, name: 'Chow Mein', category: 'Chinese', price: '$11.99' },
  { id: 8, name: 'Fried Rice', category: 'Chinese', price: '$10.99' },
  { id: 9, name: 'Spaghetti Carbonara', category: 'Pasta', price: '$13.99' },
  { id: 10, name: 'Masala Dosa', category: 'Indian', price: '$7.99' },
  { id: 11, name: 'Paper Dosa', category: 'Indian', price: '$6.99' },
  { id: 12, name: 'Samosa Wrap', category: 'Indian', price: '$5.99' },
  { id: 13, name: 'Chocolate Cake', category: 'Desserts', price: '$6.99' },
  { id: 14, name: 'Cheesecake', category: 'Desserts', price: '$7.99' },
]

export default function search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState(SEARCH_HISTORY)

  // Filter items based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return ALL_ITEMS.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleSearch = (query: any) => {
    setSearchQuery(query)
  }

  const handleSearchItemPress = (item : any) => {
    setSearchQuery(item)
    // Add to history if not already present
    setSearchHistory(prev => {
      const filtered = prev.filter(h => h !== item)
      return [item, ...filtered].slice(0, 5)
    })
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  const renderSearchResultItem = ({ item } : {item: any}) => (
    <TouchableOpacity className="bg-white p-4 border-b border-gray-200">
      <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
      <View className="flex-row justify-between mt-2">
        <Text className="text-sm text-gray-600">{item.category}</Text>
        <Text className="text-sm font-bold text-orange-600">{item.price}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderHotSearchItem = ({ item } : {item: any}) => (
    <TouchableOpacity
      onPress={() => handleSearchItemPress(item)}
      className="bg-orange-50 px-4 py-2 rounded-full mr-2 mb-2"
    >
      <Text className="text-sm text-orange-600">{item}</Text>
    </TouchableOpacity>
  )

  const renderHistoryItem = ({ item } : {item: any}) => (
    <TouchableOpacity
      onPress={() => handleSearchItemPress(item)}
      className="bg-gray-100 px-4 py-2 rounded-full mr-2 mb-2"
    >
      <Text className="text-sm text-gray-700">{item}</Text>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-white">
      {/* Search Input */}
     

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {searchQuery.trim() ? (
          // Show search results
          <View>
            <View className="px-4 py-3">
              <Text className="text-lg font-bold text-gray-800">
                Results ({searchResults.length})
              </Text>
            </View>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderSearchResultItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
              />
            ) : (
              <View className="items-center justify-center py-8">
                <Text className="text-gray-500">No items found</Text>
              </View>
            )}
          </View>
        ) : (
          // Show hot searches and history
          <View>
            {/* Hot Searches Section */}
            <View className="px-4 py-6">
              <Text className="text-lg font-bold text-gray-800 mb-3">🔥 Hot Searches</Text>
              <View className="flex-row flex-wrap">
                <FlatList
                  data={HOT_SEARCHES}
                  renderItem={renderHotSearchItem}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'flex-start' }}
                />
              </View>
            </View>

            {/* Search History Section */}
            {searchHistory.length > 0 && (
              <View className="px-4 py-6 border-t border-gray-200">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-lg font-bold text-gray-800">📋 Search History</Text>
                  <TouchableOpacity onPress={handleClearHistory}>
                    <Text className="text-sm text-orange-600 font-semibold">Clear</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row flex-wrap">
                  <FlatList
                    data={searchHistory}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'flex-start' }}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
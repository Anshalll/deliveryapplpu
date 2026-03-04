import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

export default function fav() {
  const [items, setItems] = useState([
    { id: '1', name: 'Meal 1', price: 6.5, available: true, img: require('@/assets/images/item.png') },
    { id: '2', name: 'Beverage 1', price: 2.25, available: true, img: require('@/assets/images/item.png') },
    { id: '3', name: 'Dessert 1', price: 3.0, available: false, img: require('@/assets/images/item.png') },
  ])

  const removeFav = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const handleUnfavorite = (id: string) => {
    Alert.alert('Remove favorite', 'Remove this item from favorites?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeFav(id) },
    ])
  }

  return (
    <ScrollView className='flex-1 p-4' contentContainerStyle={{ paddingBottom: 40 }}>
      <Text className='text-2xl font-bold mb-4'>Favorites</Text>

      {items.length === 0 && (
        <Text className='text-center text-gray-500'>No favorites yet</Text>
      )}

      {items.map(item => (
        <View key={item.id} className='flex flex-row items-center mb-4 bg-white rounded p-2 shadow'>
          <Image source={item.img} style={{ width: 80, height: 80, borderRadius: 8 }} />

          <View className='flex-1 ml-3'>
            <Text className='font-medium text-base'>{item.name}</Text>
            <Text className='text-sm text-gray-500'>${item.price.toFixed(2)}</Text>
            <Text className={`text-sm mt-1 ${item.available ? 'text-green-600' : 'text-red-500'}`}>
              {item.available ? 'In stock' : 'Out of stock'}
            </Text>
          </View>

          <View className='items-end'>
            <TouchableOpacity onPress={() => handleUnfavorite(item.id)} className='px-3 py-1'>
              <Text className='text-red-500'>Unfavorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
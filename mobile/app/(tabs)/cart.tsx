import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'

export default function cart() {

  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Meal 1',
      price: 6.5,
      qty: 2,
      img: require('@/assets/images/item.png'),
    },
    {
      id: '2',
      name: 'Beverage 1',
      price: 2.25,
      qty: 1,
      img: require('@/assets/images/item.png'),
    },
    {
      id: '3',
      name: 'Dessert 1',
      price: 3.0,
      qty: 3,
      img: require('@/assets/images/item.png'),
    },
  ])

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const total = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0)

  const handleCheckout = () => {
    Alert.alert('Checkout', `Total: $${total.toFixed(2)}`)
  }

  return (
    <ScrollView className='flex-1 p-4' contentContainerStyle={{ paddingBottom: 40 }}>
      <Text className='text-2xl font-bold mb-4'>Your Cart</Text>

      {cartItems.length === 0 && (
        <Text className='text-center text-gray-500'>Your cart is empty</Text>
      )}

      {cartItems.map(item => (
        <View key={item.id} className='flex flex-row items-center mb-4 bg-white rounded p-2 shadow'>
          <Image source={item.img} style={{ width: 80, height: 80, borderRadius: 8 }} />

          <View className='flex-1 ml-3'>
            <Text className='font-medium text-base'>{item.name}</Text>
            <Text className='text-sm text-gray-500'>Price: ${item.price.toFixed(2)}</Text>

            <View className='flex flex-row items-center mt-2'>
              <TouchableOpacity onPress={() => updateQty(item.id, -1)} className='bg-gray-200 px-3 py-1 rounded'>
                <Text>-</Text>
              </TouchableOpacity>
              <Text className='mx-3'>{item.qty}</Text>
              <TouchableOpacity onPress={() => updateQty(item.id, 1)} className='bg-gray-200 px-3 py-1 rounded'>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='items-end'>
            <Text className='font-medium'>${(item.price * item.qty).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)} className='mt-3'>
              <Text className='text-red-500'>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View className='mt-6 border-t pt-4'>
        <View className='flex flex-row justify-between items-center mb-4'>
          <Text className='text-lg font-semibold'>Total</Text>
          <Text className='text-lg font-semibold'>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity onPress={handleCheckout} className='bg-green-600 py-3 rounded items-center'>
          <Text className='text-white font-semibold'>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
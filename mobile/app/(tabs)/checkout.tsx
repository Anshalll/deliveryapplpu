import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [promoCode, setPromoCode] = useState('')

  const cartItems = [
    { id: 1, name: 'Uncle Chips Spicy', price: 1899, quantity: 2 },
    { id: 2, name: 'Lay\'s Classic', price: 1799, quantity: 1 },
    { id: 3, name: 'Coca Cola 500ml', price: 99, quantity: 3 }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = 49
  const discount = promoCode === 'SAVE10' ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + tax + deliveryFee - discount

  const paymentMethods = [
    { id: 'card', name: 'Card', icon: 'credit-card' },
    { id: 'upi', name: 'UPI', icon: 'cashless' },
    { id: 'wallet', name: 'Wallet', icon: 'wallet' }
  ]

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-[15px] gap-[20px]">
        {/* Header */}
        <View className="flex flex-row items-center gap-[10px]">
          <AntDesign name="star" size={24} color="crimson" />
          <Text className="text-2xl font-bold">Checkout</Text>
        </View>

        {/* Cart Items */}
        <View className="bg-white rounded-lg p-[15px] shadow-sm">
          <Text className="text-lg font-semibold mb-[10px]">Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} className="flex flex-row justify-between items-center py-[8px] border-b border-gray-200">
              <View className="flex-1">
                <Text className="font-medium">{item.name}</Text>
                <Text className="text-xs text-gray-600">Qty: {item.quantity}</Text>
              </View>
              <Text className="font-semibold">₹{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View className="bg-white rounded-lg p-[15px] shadow-sm">
          <View className="flex flex-row items-center gap-[10px] mb-[10px]">
            <MaterialCommunityIcons name="map-marker" size={24} color="crimson" />
            <Text className="text-lg font-semibold flex-1">Delivery Address</Text>
            <Pressable>
              <Text className="text-blue-600 text-sm font-medium">Change</Text>
            </Pressable>
          </View>
          <View className="bg-gray-50 p-[12px] rounded-lg">
            <Text className="font-medium">Home</Text>
            <Text className="text-sm text-gray-600 mt-[4px]">123 Main Street, Apt 4B</Text>
            <Text className="text-sm text-gray-600">New York, NY 10001</Text>
            <Text className="text-sm text-gray-600 mt-[4px]">Ph: +1 (555) 000-0000</Text>
          </View>
        </View>

        {/* Promo Code */}
        <View className="bg-white rounded-lg p-[15px] shadow-sm">
          <View className="flex flex-row items-center gap-[10px] mb-[10px]">
            <MaterialCommunityIcons name="ticket-percent" size={24} color="crimson" />
            <Text className="text-lg font-semibold">Promo Code</Text>
          </View>
          <View className="flex flex-row gap-[8px]">
            <TextInput
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              className="flex-1 border border-gray-300 rounded-lg px-[12px] py-[10px] text-sm"
            />
            <Pressable className="bg-blue-600 px-[16px] rounded-lg justify-center">
              <Text className="text-white font-semibold">Apply</Text>
            </Pressable>
          </View>
          {promoCode === 'SAVE10' && (
            <Text className="text-green-600 text-sm mt-[8px] font-medium">✓ Code applied! 10% off</Text>
          )}
        </View>

        {/* Payment Methods */}
        <View className="bg-white rounded-lg p-[15px] shadow-sm">
          <View className="flex flex-row items-center gap-[10px] mb-[12px]">
            <MaterialCommunityIcons name="credit-card" size={24} color="crimson" />
            <Text className="text-lg font-semibold">Payment Method</Text>
          </View>
          <View className="gap-[10px]">
            {paymentMethods.map((method) => (
              <Pressable
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                className={`flex flex-row items-center p-[12px] rounded-lg border-2 ${
                  selectedPayment === method.id ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'
                }`}
              >
                <MaterialCommunityIcons
                  name="star"
                  size={20}
                  color={selectedPayment === method.id ? 'crimson' : 'gray'}
                />
                <Text className={`ml-[12px] font-medium flex-1 ${selectedPayment === method.id ? 'text-crimson' : ''}`}>
                  {method.name}
                </Text>
                <View className={`w-[20px] h-[20px] rounded-full border-2 ${
                  selectedPayment === method.id ? 'border-red-500 bg-red-500' : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <AntDesign name="check" size={14} color="white" style={{ margin: 2 }} />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Price Breakdown */}
        <View className="bg-white rounded-lg p-[15px] shadow-sm">
          <Text className="text-lg font-semibold mb-[12px]">Price Details</Text>
          <View className="gap-[8px]">
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="font-medium">₹{subtotal}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600">Tax (5%)</Text>
              <Text className="font-medium">₹{tax}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600">Delivery</Text>
              <Text className="font-medium">₹{deliveryFee}</Text>
            </View>
            {discount > 0 && (
              <View className="flex flex-row justify-between">
                <Text className="text-green-600">Discount (10%)</Text>
                <Text className="font-medium text-green-600">-₹{discount}</Text>
              </View>
            )}
            <View className="border-t border-gray-200 pt-[8px] mt-[8px] flex flex-row justify-between">
              <Text className="font-bold text-lg">Total</Text>
              <Text className="font-bold text-lg text-crimson">₹{total}</Text>
            </View>
          </View>
        </View>

        {/* Place Order Button */}
        <Pressable className="bg-red-500 py-[14px] rounded-lg items-center">
          <Text className="text-white text-lg font-bold">Place Order</Text>
        </Pressable>

        <View className="h-[20px]" />
      </View>
    </ScrollView>
  )
}
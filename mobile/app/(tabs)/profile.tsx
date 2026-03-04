import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native'
import React, { useState } from 'react'
import { User, MapPin, CreditCard, Clock, Heart, Gift, Headphones, Bell, LogOut, Settings } from 'lucide-react-native'

export default function profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 555-123-4567',
    avatar: require('@/assets/images/item.png'),
    defaultAddress: '123 Main St, Springfield',
  })

  const [addresses, setAddresses] = useState([
    { id: 'a1', label: 'Home', address: '123 Main St, Springfield' },
    { id: 'a2', label: 'Work', address: '456 Office Rd, Metropolis' },
  ])

  const [payments, setPayments] = useState([
    { id: 'p1', brand: 'Visa', last4: '4242' },
    { id: 'p2', brand: 'Mastercard', last4: '1111' },
  ])

  const recentOrders = [
    { id: 'o1', date: '2026-02-20', total: 23.5 },
    { id: 'o2', date: '2026-02-15', total: 12.75 },
  ]

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [loyaltyPoints] = useState(320)
  const promoCodes = [{ code: 'WELCOME10', desc: '10% off first order' }]

  const handleEditProfile = () => {
    Alert.alert('Edit profile', 'Open edit profile screen (not implemented)')
  }

  const handleAddAddress = () => {
    Alert.alert('Add address', 'Open add address screen (not implemented)')
  }

  const handleAddPayment = () => {
    Alert.alert('Add payment', 'Open add payment screen (not implemented)')
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => console.log('logout') },
    ])
  }

  return (
    <ScrollView className='flex-1 p-4' contentContainerStyle={{ paddingBottom: 40 }}>
      <View className='flex-row items-center'>
        <Image source={user.avatar} style={{ width: 80, height: 80, borderRadius: 40 }} />

        <View className='ml-4 flex-1'>
          <Text className='text-xl font-bold'>{user.name}</Text>
          <Text className='text-sm text-gray-500'>{user.email}</Text>
          <Text className='text-sm text-gray-500'>{user.phone}</Text>
        </View>

        <TouchableOpacity onPress={handleEditProfile} className='px-3 py-2 bg-gray-200 rounded'>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>

      <View className='mt-6'>
        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <MapPin size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Saved Addresses</Text>
          </View>
          <TouchableOpacity onPress={handleAddAddress}>
            <Text className='text-blue-600'>Add</Text>
          </TouchableOpacity>
        </View>
        {addresses.map(a => (
          <View key={a.id} className='flex-row items-start mb-3'>
            <View className='flex-1'>
              <Text className='font-medium'>{a.label}</Text>
              <Text className='text-sm text-gray-500'>{a.address}</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Edit address')} className='px-2 py-1'>
              <Text className='text-blue-600'>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <CreditCard size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Payment Methods</Text>
          </View>
          <TouchableOpacity onPress={handleAddPayment}>
            <Text className='text-blue-600'>Add</Text>
          </TouchableOpacity>
        </View>
        {payments.map(p => (
          <View key={p.id} className='flex-row items-center justify-between mb-3'>
            <View>
              <Text className='font-medium'>{p.brand}</Text>
              <Text className='text-sm text-gray-500'>**** **** **** {p.last4}</Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Manage payment')} className='px-2 py-1'>
              <Text className='text-blue-600'>Manage</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Clock size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Recent Orders</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Orders')}>
            <Text className='text-blue-600'>View all</Text>
          </TouchableOpacity>
        </View>
        {recentOrders.map(o => (
          <View key={o.id} className='flex-row items-center justify-between mb-2'>
            <Text>{o.date}</Text>
            <Text className='font-medium'>${o.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View className='mt-6'>
        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Bell size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Notifications</Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Gift size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Promotions</Text>
          </View>
          <Text className='text-sm text-gray-500'>{promoCodes.length} available</Text>
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Heart size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Saved Restaurants</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Saved')}>
            <Text className='text-blue-600'>View</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <User size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Referrals</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Referrals')}>
            <Text className='text-blue-600'>Invite</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Headphones size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Support</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Support')}>
            <Text className='text-blue-600'>Contact</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Settings size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Settings</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Settings')}>
            <Text className='text-blue-600'>Open</Text>
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <LogOut size={18} color={'#111'} />
            <Text className='text-lg font-semibold ml-2'>Logout</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text className='text-red-600'>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='mt-8'>
        <TouchableOpacity onPress={handleLogout} className='bg-red-600 py-3 rounded items-center'>
          <Text className='text-white font-semibold'>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
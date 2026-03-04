import { View, Text } from 'react-native'
import React from 'react'
import HomeWindow from '@/components/HomeWindow'


export default function index() {
  return (
    <View className='overflow-y-auto' style={{ flex: 1 }}>
      <HomeWindow/>
    </View>
  )
}
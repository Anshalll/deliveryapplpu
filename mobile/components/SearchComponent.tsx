import { View, Text , TextInput , Pressable} from 'react-native'
import React from 'react'
import { useTheme } from '@/ThemeContext'
import { Search } from 'lucide-react-native';


export default function SearchComponent() {

    const { theme } = useTheme();

    return (
        <View className={`w-[65%] px-[10px] gap-[3px] flex-row flex items-center ${theme.dark ? "bg-gray-900" : "bg-white border-2 border-[crimson]" }  rounded-lg`}>
            <Search size={20}/>
            <TextInput placeholder='Search something..'/>
            
            
        </View>
    )
}
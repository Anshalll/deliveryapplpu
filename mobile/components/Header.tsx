import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/ThemeContext'
import { Search, Menu, X, Navigation } from 'lucide-react-native'
import { useMenu } from '@/MenuContext'
import { useRouter } from 'expo-router'


export default function Header() {

    const { ToggleTheme, theme } = useTheme()
    const { toggleMenu } = useMenu();
    const [isSearchOpen, setisSearchOpen] = useState(false)
    const router = useRouter()
    const searchInputRef = useRef<TextInput>(null)

    const handleSearch = () => {
        router.push("/(tabs)/search")
        setisSearchOpen(true)
        // Focus the input field after a short delay to ensure it's rendered
        setTimeout(() => {
            searchInputRef.current?.focus()
        }, 100)
    }

    useEffect(() => {
        // Close search when route changes
        if (router.canGoBack()) {
            setisSearchOpen(false)
        }
    }, [router])

    const CloseSearch = () => {
        setisSearchOpen(false)
        if (router.canGoBack()) {
            router.back()
        }
    }

    return (
        <View className='flex flex-row justify-between px-[10px] w-full bg-red-500 items-center' style={{ backgroundColor: theme.background }}>

            <Image
                source={require("../assets/images/applogo.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
            />
            <View className='flex flex-row gap-[10px] items-center'>

                {isSearchOpen ?
                    <View className='w-[80%] rounded-lg border-2 rounded-lg border-orange-500 flex flex-row items-center'>

                        <TextInput 
                            ref={searchInputRef}
                            placeholder='Search for something..' 
                            className='w-[90%] ' 
                        />
                        <Pressable onPress={() => CloseSearch()} className='w-[10%]'>
                            <X size={20} />
                        </Pressable>
                    </View>

                    : <Pressable onPress={() => handleSearch()}>

                        <Search size={20} />
                    </Pressable>}



                <Pressable onPress={() => toggleMenu()}>
                    <Menu size={20} />
                </Pressable>
            </View>


        </View>
    )
}   
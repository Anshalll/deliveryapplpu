import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { ChevronRight, Star } from 'lucide-react-native';
import { Link , useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Route } from "expo-router/build/Route";

export default function HomeWindow() {

  const router = useRouter()

  const Data = [
    {
      Name: "Meal & Combos",
      products: Array.from({ length: 6 }).map((_, i) => ({
        name: `Meal ${i + 1}`,
        img: require("@/assets/images/item.png"),
      })),
    },
    {
      Name: "Beverages",
      products: Array.from({ length: 5 }).map((_, i) => ({
        name: `Beverage ${i + 1}`,
        img: require("@/assets/images/item.png"),
      })),
    },
    {
      Name: "Desserts",
      products: Array.from({ length: 3 }).map((_, i) => ({
        name: `Dessert ${i + 1}`,
        img: require("@/assets/images/item.png"),
      })),
    },
  ];

  const HandleItemRoute = (id: Number) => {
    router.push(`/item/${id}`)
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Banner */}
      <View className="px-4 mt-4">
        <Image
          source={require("@/assets/images/heroimage.jpg")}
          className="w-full h-[180px] rounded-2xl"
          resizeMode="cover"
        />
      </View>

      {/* Sections */}
      {Data.map((section, index) => (
        <View key={index} className="mt-8">

          {/* Section Header */}
          <View className="px-4 flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              {section.Name}
            </Text>
            <Text className="text-sm text-orange-500 font-semibold">
              <Link href={"/(tabs)/cats"} className="flex flex-row items-center gap-[10px]"> <Text>See more</Text> <ChevronRight /></Link>
            </Text>
          </View>

          {/* Horizontal Product Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
          >
            {section.products.map((product, i) => (
              <Pressable 
                onPress={()=> HandleItemRoute(i)}
                key={i}
                className="bg-gray-100 p-[10px] flex-col gap-[3px] relative w-[140px] mr-4 rounded-2xl shadow-lg"
                style={{
                  elevation: 2,
                }}
              >

                <View className="shadow-lg absolute bg-white right-0 z-[1] flex items-center flex-row w-[30px] h-[30px] justify-center gap-[4px] p-[5px] rounded-full">
                 <Entypo name="heart-outlined" size={19} color="crimson" />
                
                </View>

                <Image
                  source={product.img}
                  className="w-full h-[110px] rounded-t-2xl"
                  resizeMode="cover"
                />
              
                
                 
                <Text className="text-sm text-green-600">Veg</Text>
                <View className="">
                  <Text
                    numberOfLines={1}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {product.name}
                  </Text>

                  <View className="flex flex-row gap-[2px]">
                    <AntDesign name="star" size={10} color="gold" />
                    <AntDesign name="star" size={10} color="gold" />
                    <AntDesign name="star" size={10} color="gold" />
                    <AntDesign name="star" size={10} color="gold" />
                  </View>

                  <Text className="text-md   mt-1">
                    ₹199
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}
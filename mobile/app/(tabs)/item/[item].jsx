import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Heart, Share, ChevronRight } from 'lucide-react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
export default function Item() {

  const { item } = useLocalSearchParams();

  const [ItemData, setItemData] = useState({
    name: "Item name",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, hic nam repudiandae itaque pariatur odio neque enim, ipsum voluptates ducimus voluptatibus repellendus dignissimos facilis alias quasi quibusdam! Voluptatum nobis maxime quos voluptate.",
    price: 2000,
    deltime: 20,
    image: [
      "https://www.bbassets.com/media/uploads/p/l/20004325_14-uncle-chips-uncle-chips-potato-chips-plain-salted-flavour.jpg",
      "https://www.bbassets.com/media/uploads/p/l/20004325_14-uncle-chips-uncle-chips-potato-chips-plain-salted-flavour.jpg",
      "https://www.bbassets.com/media/uploads/p/l/20004325_14-uncle-chips-uncle-chips-potato-chips-plain-salted-flavour.jpg",
    ]
  });

  const [similarProducts] = useState([
    {
      id: 1,
      name: "Uncle Chips Spicy",
      price: 1899,
      originalPrice: 2799,
      discount: "32% OFF",
      rating: 4.5,
      image: ItemData.image[0]
    },
    {
      id: 2,
      name: "Lay's Classic",
      price: 1799,
      originalPrice: 2699,
      discount: "33% OFF",
      rating: 4.3,
      image: ItemData.image[0]
    },
    {
      id: 3,
      name: "Bingo Masala",
      price: 1599,
      originalPrice: 2499,
      discount: "36% OFF",
      rating: 4.2,
      image: ItemData.image[0]
    },
    {
      id: 4,
      name: "Kurkure Puffcorn",
      price: 1699,
      originalPrice: 2599,
      discount: "35% OFF",
      rating: 4.4,
      image: ItemData.image[0]
    }
  ]);
  return (
    <View  className="relative   ">

      <ScrollView className=" p-[10px]  ">
        <View className="w-[100%] relative h-[400px] flex items-center justify-center flex-row bg-gray-100">

          <View className="absolute top-[10px] z-[1] gap-[10px]  p-[5px] right-[10px] justify-end  w-[400px] flex  flex-row">
            <Pressable className="bg-white   shadow-xl rounded-full p-[5px]">
              <Heart size={20} />
            </Pressable>

            <Pressable className="bg-white  shadow-xl rounded-full p-[5px]">
              <Share className="text-[crimson]" size={20} />
            </Pressable>


          </View>
          <Image
            source={{ uri: ItemData.image[0] }}
            className="object-contain w-[300px] h-[350px]"
          />
        </View>
        <View className="flex flex-col gap-[10px] p-[20px]  bg-white shadow-sm rounded-lg">

          <View className="flex flex-row items-center  gap-[10px]">
            <View className="flex flex-row gap-[7px]">
              <Ionicons name="time" size={16} color="green" />
              <Text>12 mins</Text>
            </View>
            <View className="flex bg-gray-600 px-[10px] py-[3px] rounded-full flex-row gap-[2px]">
              <AntDesign className="" name="star" size={10} color="gold" />
              <AntDesign name="star" size={10} color="gold" />
              <AntDesign name="star" size={10} color="gold" />
              <AntDesign name="star" size={10} color="gold" />
            </View>
          </View>

          <View className="flex flex-col gap-[10px]  w-full">
            <Text className="font-semibold">260 g</Text>

            <View className="flex flex-row items-center gap-[10px]">
              <Text style={{ textDecorationLine: 'line-through' }} className="text-[crimson]">
                ₹2,999
              </Text>
              <Text>₹{ItemData.price}</Text>
              <Text className="bg-blue-200 text-sm px-[10px] py-[1px] rounded-lg">49% OFF</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-col bottom-4  mt-[20px] h-[380px] p-[10px]  bg-white shadow-sm">
          <View className="flex w-full  flex-row justify-between items-center">
            <Text className="text-lg  font-semibold">Similar products</Text>

            <Link href={"/"} className="flex flex-row w-[90px] text-orange-500 items-center">See more  <ChevronRight size={13} /></Link>


          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-[10px]">
            <View className="flex flex-row gap-[15px]">
              {similarProducts.map((product) => (
                <Pressable key={product.id} className="bg-gray-50 rounded-lg p-[10px] w-[160px] h-[230px] border border-gray-200">
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: '100%', height: 120 }}
                    className="rounded-md mb-[8px]"
                  />
                  <Text className="text-sm font-semibold mb-[4px] line-clamp-2">{product.name}</Text>
                  <View className="flex flex-row items-center gap-[4px] mb-[6px]">
                    <AntDesign name="star" size={12} color="gold" />
                    <Text className="text-xs text-gray-600">{product.rating}</Text>
                  </View>
                  <View className="flex flex-row items-center gap-[5px] mb-[8px]">
                    <Text style={{ textDecorationLine: 'line-through' }} className="text-xs text-gray-500">
                      ₹{product.originalPrice}
                    </Text>
                    <Text className="text-sm font-semibold">₹{product.price}</Text>
                  </View>
                  <Text className="text-xs bg-green-100 text-green-700 px-[6px] py-[2px] rounded w-[50px]">{product.discount}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>


      </ScrollView>

      <View className="absolute flex p-[20px] flex-row items-center justify-between bg-white shaadow-t-xl w-full h-[100px] bottom-0">
        <View className="flex flex-col gap-[10px]">
          <Text className="font-semibold">850 g</Text>
          <View className="flex flex-row gap-[10px]">
            <Text className="font-semibold text-lg">
              ₹{ItemData.price}
            </Text>
            <View className="flex items-center flex-row gap-[3px]">
              <Text>MRP</Text>
              <Text className="text-[crimson] font-semibold" style={{ textDecorationLine: 'line-through' }} > ₹2000</Text>

            </View>

          </View>
          <Text>Inclusive of all taxes</Text>
        </View>

        <Pressable className="bg-green-500  px-[20px] py-[10px]  rounded-lg text-white">
          <Text className="text-white">
            Add to cart
          </Text>
        </Pressable>
      </View>
    </View>

  );
}

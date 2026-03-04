import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useMenu } from "@/MenuContext";
import {
  X,
  LayoutGrid,
  ClipboardList,
  MapPin,
  CreditCard,
  TicketPercent,
  Settings,
  LogOut,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Menu() {
  const { menuOpen, toggleMenu } = useMenu();
  const router = useRouter();

  const navigate = (path: string) => {
    toggleMenu(); // close menu first
    router.push(path as any);
  };



  return (
    <SafeAreaView
      edges={["top"]}
      className={`flex-1 ${menuOpen  ?  "px-[0px]" : "right-[-100%]" } w-full h-full absolute z-50`}
    >
      <View className="flex-1 flex-row">

        {/* Overlay */}
        <Pressable
          onPress={toggleMenu}
          className="bg-black opacity-10 w-[40%] h-full"
        />

        {/* Drawer */}
        <View className="w-[60%] bg-white h-full p-4">

          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold">Menu</Text>
            <Pressable onPress={toggleMenu}>
              <X size={22} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Main */}
            <Text className="text-gray-400 text-lg mb-2">Browse</Text>

            <MenuItem
              icon={<LayoutGrid size={20} />}
              label="Categories"
              onPress={() => navigate("/(tabs)/cats")}
            />

            <MenuItem
              icon={<ClipboardList size={20} />}
              label="My Orders"
              onPress={() => navigate("/orders")}
            />

            <MenuItem
              icon={<MapPin size={20} />}
              label="Saved Addresses"
              onPress={() => navigate("/addresses")}
            />

            <MenuItem
              icon={<CreditCard size={20} />}
              label="Payments"
              onPress={() => navigate("/payments")}
            />

            <View className="h-px bg-gray-200 my-4" />

            {/* Offers */}
            <Text className="text-gray-400 text-lg mb-2">Offers</Text>

            <MenuItem
              icon={<TicketPercent size={20} />}
              label="Coupons"
              onPress={() => navigate("/offers")}
            />

            <View className="h-px bg-gray-200 my-4" />

            {/* Settings */}
            <Text className="text-gray-400 text-lg mb-2">Settings</Text>

            <MenuItem
              icon={<Settings size={20} />}
              label="Settings"
              onPress={() => navigate("/settings")}
            />

            <MenuItem
              icon={<LogOut size={20} />}
              label="Logout"
              onPress={() => console.log("logout logic")}
            />

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* Reusable Menu Item */
function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-3"
    >
      <View className="mr-3">{icon}</View>
      <Text className="text-lg">{label}</Text>
    </Pressable>
  );
}
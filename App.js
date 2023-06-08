//com.reactnativecommunity.asyncstorage


import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";
import LoginScreen from "./src/screens/LoginScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/components/Home";
import CommentsScreen from "./src/screens/CommentsScreen";
import MapScreen from "./src/screens/MapScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomHeader } from "./src/components/CustomHeader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './src/redux/store';

const MainNav = createStackNavigator();
// const HomeNav = createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Roboto: require(''),
  // });
  // const navigation = useNavigation();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <MainNav.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <MainNav.Screen name="Login" component={LoginScreen} />
              <MainNav.Screen name="Register" component={RegistrationScreen} />
              <MainNav.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Posts",
                }}
              />
              <MainNav.Screen
                name="Comments"
                component={CommentsScreen}
                options={{
                  header: ({ navigation, route, options }) => {
                    const title = route.name;
                    return (
                      <CustomHeader
                        title={title}
                        options={options.headerStyle}
                      />
                    );
                  },
                  headerShown: "true",
                }}
              />
              <MainNav.Screen
                name="Map"
                component={MapScreen}
                // geoLocation={params=>params.geoLocation}
                options={{
                  header: ({ navigation, route, options }) => {
                    const title = route.name;
                    return (
                      <CustomHeader
                        title={title}
                        options={options.headerStyle}
                      />
                    );
                  },
                  headerShown: "true",
                }}
              />
            </MainNav.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

//import { StatusBar } from 'expo-status-bar';

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import StarRating from '../components/StarRating';
import SearchBar from '../components/SearchBar';

const HeaderItem = () => {
    return (
      <View style={styles.header}>
           <View style={styles.headerTitle}>
             <SearchBar/>
           </View>

           <View style={styles.headerCart}>
             <View style={styles.buttonCart}>
               <Image source={require('../../assets/icons/cart.png')} />
               <Text style={styles.numCart}>2</Text>
             </View>
           </View>
      </View>
    );
};

const WelcomeItem = () => {
    return (
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={true}
          height={200}
          activeDotColor="#fff">
          <View style={styles.slide}>
            <Image
              source={require('../../assets/icons/ebooff-mobile-countone.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/icons/ebooff-mobile-counttwo.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../assets/icons/ebooff-mobile-countfour.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>
    );
};

const CategoryItem = () => {

    return (

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../../assets/restaurants/asiatique/img-global.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Asiatique</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../../assets/restaurants/francais/img-global-restofrench.jpeg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Européen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../../assets/restaurants/tacos/takos-burger-img-global.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Tacos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Fastfood Center'})
          }>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../../assets/restaurants/burger/img-global-burger.jpeg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Burger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../../assets/restaurants/africain/global-african-img.jpeg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Africain</Text>
        </TouchableOpacity>
      </View>

    );

};

const BestMarkItem = () => {
  return (
    <View>
    <Text
      style={{
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      }}>
      Les mieux notés
    </Text>

    <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           style={{ marginHorizontal: 10, marginTop: 30, paddingLeft: 10, }}
         >
           <View
             style={{
               backgroundColor: "#FEFEFE",
               height: 200,
               width: 190,
               borderRadius: 15,
               padding: 5,
             }}
           >
             <Image
               source={require("../../assets/restaurants/africain/thiephouse/thiep-poulet-plate.jpeg")}
               style={{ width: 180, borderRadius: 10, height: 130 }}
             />

             <View
               style={{
                 flexDirection: "row",
                 width: 150,
                 alignItems: "center",
               }}
             >
               <View
                 style={{
                   paddingHorizontal: 5,
                   paddingVertical: 5,
                 }}
               >
                 <Text
                   style={{
                     fontFamily: "RobotoRegular",
                     fontSize: 13,
                     color: "grey",
                     fontWeight: "bold"
                   }}
                 >
                   Thiep - House
                 </Text>
               </View>

             </View>

               <View
                 style={{
                   flexDirection: "row",
                   width: 150,
                   alignItems: "center",
                 }}
               >
                 <View
                   style={{
                     paddingHorizontal: 5,
                     paddingVertical: 5,
                     flexDirection: "row",
                   }}
                 >
                 <Icon name="star" size={25} color="#009387" />
                 <Text style={{
                   color: "grey",
                   fontWeight: "bold"
                 }}>4.8 (Très Bien)</Text>
               </View>

             </View>

           </View>

           <View
             style={{
               backgroundColor: "#FEFEFE",
               height: 200,
               width: 190,
               borderRadius: 15,
               padding: 5,
               marginHorizontal: 20,
             }}
           >
             <Image
               source={require("../../assets/restaurants/africain/saucetartare-africa/brochette-viande-plate.jpg")}
               style={{ width: 180, borderRadius: 10, height: 130 }}
             />
             <View
               style={{
                 flexDirection: "row",
                 width: 150,
                 alignItems: "center",
               }}
             >
               <View
                 style={{
                   paddingHorizontal: 5,
                   paddingVertical: 5,
                 }}
               >
                 <Text
                   style={{
                     fontFamily: "RobotoRegular",
                     fontSize: 13,
                     color: "grey",
                     fontWeight: "bold"
                   }}
                 >
                   Saucetartare - Africa
                 </Text>
               </View>

             </View>

               <View
                 style={{
                   flexDirection: "row",
                   width: 150,
                   alignItems: "center",
                 }}
               >
                 <View
                   style={{
                     paddingHorizontal: 5,
                     paddingVertical: 5,
                     flexDirection: "row",
                   }}
                 >
                 <Icon name="star" size={25} color="orange" />
                 <Text style={{
                   color: "grey",
                   fontWeight: "bold"
                 }}>3.5 (Moyen)</Text>
               </View>

             </View>
           </View>

           <View
             style={{
               backgroundColor: "#FEFEFE",
               height: 200,
               width: 190,
               borderRadius: 15,
               padding: 5,
               marginHorizontal: 20,
             }}
           >
             <Image
               source={require("../../assets/restaurants/africain/etoilerouge-africa/riz-poulet-plate.jpg")}
               style={{ width: 180, borderRadius: 10, height: 130 }}
             />
             <View
               style={{
                 flexDirection: "row",
                 width: 150,
                 alignItems: "center",
               }}
             >
               <View
                 style={{
                   paddingHorizontal: 5,
                   paddingVertical: 5,
                 }}
               >
                 <Text
                   style={{
                     fontFamily: "RobotoRegular",
                     fontSize: 13,
                     color: "grey",
                     fontWeight: "bold"
                   }}
                 >
                   Etoilerouge - Africa
                 </Text>
               </View>

             </View>

               <View
                 style={{
                   flexDirection: "row",
                   width: 150,
                   alignItems: "center",
                 }}
               >
                 <View
                   style={{
                     paddingHorizontal: 5,
                     paddingVertical: 5,
                     flexDirection: "row",
                   }}
                 >
                 <Icon name="star" size={25} color="orange" />
                 <Text style={{
                   color: "grey",
                   fontWeight: "bold"
                 }}>3.6 (Moyen)</Text>
               </View>

             </View>
           </View>

           <View
             style={{
               backgroundColor: "#FEFEFE",
               height: 200,
               width: 190,
               borderRadius: 15,
               padding: 5,
             }}
           >
             <Image
               source={require("../../assets/restaurants/burger/domac/cheesenan-burger-stek.jpg")}
               style={{ width: 180, borderRadius: 10, height: 130 }}
             />
             <View
               style={{
                 flexDirection: "row",
                 width: 150,
                 alignItems: "center",
               }}
             >
               <View
                 style={{
                   paddingHorizontal: 5,
                   paddingVertical: 5,
                 }}
               >
                 <Text
                   style={{
                     fontFamily: "RobotoRegular",
                     fontSize: 13,
                     color: "grey",
                     fontWeight: "bold"
                   }}
                 >
                   Domac
                 </Text>
               </View>

             </View>

               <View
                 style={{
                   flexDirection: "row",
                   width: 150,
                   alignItems: "center",
                 }}
               >
                 <View
                   style={{
                     paddingHorizontal: 5,
                     paddingVertical: 5,
                     flexDirection: "row",
                   }}
                 >
                 <Icon name="star" size={25} color="#ff5c83" />
                 <Text style={{
                   color: "grey",
                   fontWeight: "bold"
                 }}>2.1 (Mauvais)</Text>
               </View>

             </View>
           </View>
         </ScrollView>
         </View>
  );
};

const RecentAddItem = () =>  {
    return (

    <View style={styles.cardsWrapper}>
     <Text
       style={{
         alignSelf: 'center',
         fontSize: 18,
         fontWeight: 'bold',
         color: '#333',
       }}>
       Récemments Ajoutés
     </Text>
     <View style={styles.card}>
       <View style={styles.cardImgWrapper}>
         <Image
           source={require('../../assets/restaurants/asiatique/weng-asian/img-weng-resto.jpeg')}
           resizeMode="cover"
           style={styles.cardImg}
         />
       </View>
       <View style={styles.cardInfo}>
         <Text style={styles.cardTitle}>Weng-Asian</Text>
         <StarRating ratings={4} reviews={99} />
         <Text style={styles.cardDetails}>
           A consommer à froid
         </Text>
       </View>
     </View>
     <View style={styles.card}>
       <View style={styles.cardImgWrapper}>
         <Image
           source={require('../../assets/restaurants/francais/tradi-bistrot/tartare-boeuf-revisite.jpeg')}
           resizeMode="cover"
           style={styles.cardImg}
         />
       </View>
       <View style={styles.cardInfo}>
         <Text style={styles.cardTitle}>Tradi-Bistrot</Text>
         <StarRating ratings={4} reviews={99} />
         <Text style={styles.cardDetails}>
           Des plats à votre portée
         </Text>
       </View>
     </View>
     <View style={styles.card}>
       <View style={styles.cardImgWrapper}>
         <Image
           source={require('../../assets/restaurants/tacos/wetacos/kebab-viande-plate.jpg')}
           resizeMode="cover"
           style={styles.cardImg}
         />
       </View>
       <View style={styles.cardInfo}>
         <Text style={styles.cardTitle}>Wetacos</Text>
         <StarRating ratings={4} reviews={99} />
         <Text style={styles.cardDetails}>
           Dessert chaud/froid
         </Text>
       </View>

     </View>
     <View style={styles.card}>
       <View style={styles.cardImgWrapper}>
         <Image
           source={require('../../assets/restaurants/burger/domac/burger-fish.jpeg')}
           resizeMode="cover"
           style={styles.cardImg}
         />
       </View>
       <View style={styles.cardInfo}>
         <Text style={styles.cardTitle}>Domac</Text>
         <StarRating ratings={3} reviews={3} />
         <Text style={styles.cardDetails}>
           A consommer Chaud
         </Text>
       </View>
     </View>
    </View>

  );
};

export default function HomeScreen({navigation}) {

  const theme = useTheme();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

       <HeaderItem />

       <WelcomeItem />

       <CategoryItem />

       <BestMarkItem />

       <RecentAddItem/>

   </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F5F5F5',
    backgroundColor: '#fce8e1',
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 250,
    marginVertical: 10,
    flexDirection: 'column',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 2.5,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },

  headerTitle: {
    width: '80%',
    position: 'absolute',
    left: 20,
    top: 15,
  },
  headerCart: {
    width: '20%',
    position: 'absolute',
    right: 20,
    top: 20,
  },

  buttonCart: {
    backgroundColor: '#009387',
    padding: 12,
    flexDirection: 'row',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowColor: '#F7CB6B',
    shadowRadius: 2,
  },
  numCart: {
    fontFamily: 'CeraPro-Medium',
    color: '#FFF',
    paddingLeft: 10,
  },
  header: {
    flex: 1,
    padding: 40,
  },
});

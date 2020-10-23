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

import StarRating from '../components/StarRating';

export default function HomeScreen({navigation}) {

  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
     <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
     <View style={styles.sliderContainer}>
       <Swiper
         autoplay
         horizontal={false}
         height={200}
         activeDotColor="#FF6347">
         <View style={styles.slide}>
           <Image
             source={require('../../assets/photo-big-muffin.jpeg')}
             resizeMode="cover"
             style={styles.sliderImage}
           />
         </View>
         <View style={styles.slide}>
           <Image
             source={require('../../assets/photo-burger.jpeg')}
             resizeMode="cover"
             style={styles.sliderImage}
           />
         </View>
         <View style={styles.slide}>
           <Image
             source={require('../../assets/photo-cooking-dessert.jpeg')}
             resizeMode="cover"
             style={styles.sliderImage}
           />
         </View>
       </Swiper>
     </View>

     <View style={styles.categoryContainer}>
       <TouchableOpacity
         style={styles.categoryBtn}
         onPress={() =>
           navigation.navigate('CardListScreen', {title: 'Restaurant'})
         }>
         <View style={styles.categoryIcon}>
           <Ionicons name="ios-restaurant" size={35} color="#FF6347" />
         </View>
         <Text style={styles.categoryBtnTxt}>Restaurant</Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.categoryBtn}
         onPress={() =>
           navigation.navigate('CardListScreen', {title: 'Fastfood Center'})
         }>
         <View style={styles.categoryIcon}>
           <MaterialCommunityIcons
             name="food-fork-drink"
             size={35}
             color="#FF6347"
           />
         </View>
         <Text style={styles.categoryBtnTxt}>Plats à emporter</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
         <View style={styles.categoryIcon}>
           <MaterialCommunityIcons name="food" size={35} color="#FF6347" />
         </View>
         <Text style={styles.categoryBtnTxt}>Consommation</Text>
       </TouchableOpacity>
     </View>
     <View style={[styles.categoryContainer, {marginTop: 10}]}>
       <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
         <View style={styles.categoryIcon}>
           <Fontisto name="hotel" size={35} color="#FF6347" />
         </View>
         <Text style={styles.categoryBtnTxt}>Restaurants</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
         <View style={styles.categoryIcon}>
           <Ionicons name="md-restaurant" size={35} color="#FF6347" />
         </View>
         <Text style={styles.categoryBtnTxt}>Choix Consommation</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
         <View style={styles.categoryIcon}>
           <MaterialIcons name="expand-more" size={35} color="#FF6347" />
         </View>
         <Text style={styles.categoryBtnTxt}>Plus d'informations</Text>
       </TouchableOpacity>
     </View>

     <View style={styles.cardsWrapper}>
       <Text
         style={{
           alignSelf: 'center',
           fontSize: 18,
           fontWeight: 'bold',
           color: '#333',
         }}>
         Récemment
       </Text>
       <View style={styles.card}>
         <View style={styles.cardImgWrapper}>
           <Image
             source={require('../../assets/photo-nouilles.jpeg')}
             resizeMode="cover"
             style={styles.cardImg}
           />
         </View>
         <View style={styles.cardInfo}>
           <Text style={styles.cardTitle}>Chinois</Text>
           <StarRating ratings={4} reviews={99} />
           <Text style={styles.cardDetails}>
             A consommer à froid
           </Text>
         </View>
       </View>
       <View style={styles.card}>
         <View style={styles.cardImgWrapper}>
           <Image
             source={require('../../assets/photo-pasta-duerte.jpeg')}
             resizeMode="cover"
             style={styles.cardImg}
           />
         </View>
         <View style={styles.cardInfo}>
           <Text style={styles.cardTitle}>Italien</Text>
           <StarRating ratings={4} reviews={99} />
           <Text style={styles.cardDetails}>
             Des plats à votre portée
           </Text>
         </View>
       </View>
       <View style={styles.card}>
         <View style={styles.cardImgWrapper}>
           <Image
             source={require('../../assets/photo-tartre.jpeg')}
             resizeMode="cover"
             style={styles.cardImg}
           />
         </View>
         <View style={styles.cardInfo}>
           <Text style={styles.cardTitle}>Tarte</Text>
           <StarRating ratings={4} reviews={99} />
           <Text style={styles.cardDetails}>
             Dessert chaud/froid
           </Text>
         </View>
       </View>
     </View>
   </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});

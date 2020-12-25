import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Button, Animated, FlatList, TouchableOpacity } from 'react-native';

import {data} from '../models/data';

import Card from '../components/Card';

import SearchBar from '../components/SearchBar';

const HeaderItem = () => {
    return (
      <View style={styles.header}>
           <View style={styles.headerTitle}>
             <SearchBar/>
           </View>
      </View>
    );
};

export default function SpecialitiesScreen({navigation}) {

    const renderItem = ({item}) => {
        return (
            <Card
                itemData={item}
                onPress={()=> navigation.navigate('CardItemDetails', {itemData: item})}
            />
        );
    };

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderItem />

          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
          />
        </ScrollView>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',

  },
  headerTitle: {
    width: '125%',
    position: 'absolute',
    left: 0,
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

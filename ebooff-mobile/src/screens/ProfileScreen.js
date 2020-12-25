import React from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth, db } from '../context/user-context';

import * as ImagePickerExpo from 'expo-image-picker';
import Constants from 'expo-constants';

//import files from '../assets/filesBase64';

//import Share from 'react-native-share';

const userProfile = async (dataUser) => {
  let response = [];

    await  dataUser.get().then( (item) => {
      if (item.exists) {

          const selectedItem = {
            id: item.id,
            firstname: item.data().firstname,
            lastname: item.data().lastname,
            adress_street: item.data().adress_street,
            sex: item.data().sex,
            phone_number: item.data().phone_number,
            picture: item.data().picture,
            email:item.data().email
          };
          response.push(selectedItem);
          console.log("Document data:", response);

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }

  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  return response;
}

export default function ProfileScreen({navigation}) {
      const myCustomShare = async() => {
        const shareOptions = {
          message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
          url: files.appLogo,
          // urls: [files.image1, files.image2]
        }

        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch(error) {
          console.log('Error => ', error);
        }
    };

  const [mycurrentUser, setMycurrentUser] = React.useState([]);

  const auth = useAuth();
  const user = auth.user;
  const docUser = db.collection('User').doc(user.uid);
  let myResponse = [];




  React.useEffect(() => {

    const fetchData = async () => {
      myResponse = await userProfile(docUser);
      setMycurrentUser(myResponse)
      console.log(myResponse)
    };
    fetchData();

  }, []);

  const logOut = async () => {
    await auth.signout();
    navigation.navigate('Signin');
  }

  const [myimage, setmyImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePickerExpo.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setmyImage(result.uri);
    }
  };

return (
  <SafeAreaView style={styles.container}>
  {mycurrentUser ? (mycurrentUser.map((value) => {
    //console.log(value)
  return (
    <View key={value.id}>
    <View style={styles.userInfoSection}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Avatar.Image
          source={{
            uri: myimage,
          }}
          size={150}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:75,
            marginBottom: 5,
          }]}>{value.firstname}</Title>
          <Caption style={styles.caption}>{value.email}</Caption>
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <TouchableRipple onPress={() => { navigation.navigate('EditProfil') }} >
        <Text style={{flexDirection: 'row', marginTop: 15, marginLeft: 55, fontSize: 30, color: '#de4f35'}}>Modifier Profil</Text>
      </TouchableRipple>
    </View>

    <View style={styles.menuWrapper}>

      <TouchableRipple onPress={myCustomShare}>
        <View style={styles.menuItem}>
          <Icon name="map-marker-radius" color="#de4f35" size={40}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Adresse: {value.adress_street}</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon name="phone" color="#de4f35" size={40}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Téléphone: {value.phone_number}</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon name="account" color="#de4f35" size={40}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Sex: {value.sex}</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => { logOut() }}>
        <View style={styles.menuItem}>
          <Icon name="power-settings" color="#de4f35" size={40}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Se déconnecter</Text>
        </View>
      </TouchableRipple>
    </View>
    </View>
      );
        })) : (
        <div> Aucune donnée</div>
      )
    }
  </SafeAreaView>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

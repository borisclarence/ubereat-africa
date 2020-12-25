import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Picker,
  Platform,
  Button,
  CameraRoll
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';

import * as ImagePickerExpo from 'expo-image-picker';
import Constants from 'expo-constants';

import { useAuth, db } from '../context/user-context';


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

const EditProfileScreen = ({navigation}, value) => {

  const [mycurrentUser, setMycurrentUser] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState('masculin');


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



  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
    const bs = React.createRef();
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  }

  const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        adress_street: '',
        username: '',
        phone_number: '',
        sex: '',
        email: '',
  });

  const textUpdateNameChange = (val) => {
      if( val.length !== 0 ) {
          setData({
              ...data,
              firstname: val
          });
      } else {
          setData({
              ...data,
              firstname: val
          });
      }
  }

  const textUpdateSecondNameChange = (val) => {
      if( val.length !== 0 ) {
          setData({
              ...data,
              lastname: val
          });
      } else {
          setData({
              ...data,
              lastname: val
          });
      }
  }

  const textUpdateAdressStreetChange = (val) => {
      if( val.length !== 0 ) {
          setData({
              ...data,
              adress_street: val
          });
      } else {
          setData({
              ...data,
              adress_street: val
          });
      }
  }

  const textUpdatePhoneNumberChange = (val) => {
      if( val.length !== 0 ) {
          setData({
              ...data,
              phone_number: val
          });
      } else {
          setData({
              ...data,
              phone_number: val
          });
      }
  }

  const textUpdateSexChange = (val) => {
      if( val.length !== 0 ) {
          setData({
              ...data,
              sex: val
          });
      } else {
          setData({
              ...data,
              sex: val
          });
      }
  }

  const [currentDate, setCurrentDate] = React.useState('');

  React.useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);


  const editProfileHandler = async (firstname, lastname, adress_street, phone_number, sex) => {

    const id = user.uid;
    const updated_at = currentDate;
    await auth.editUser(data.firstname, data.lastname, data.adress_street, data.phone_number, data.sex, updated_at, id);
        console.log("test");
        navigation.navigate('root');


}

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


  fall = new Animated.Value(1);

  /* test */
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
  //CameraRoll.saveToCameraRoll((await Expo.ImagePicker.launchCameraAsync({})).uri);

  return (
    <View style={styles.container}>
    {mycurrentUser ? (mycurrentUser.map((value) => {
      return (
        <View key={value.id}>

      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: myimage,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="account-edit"
                    size={85}
                    color="#FF6347"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#FF6347',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {value.firstname} {value.lastname}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={value.firstname}
            onChangeText={(val) => textUpdateNameChange(val)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={value.lastname}
            onChangeText={(val) => textUpdateSecondNameChange(val)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Adresse/Rue"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={value.adress_street}
            onChangeText={(val) => textUpdateAdressStreetChange(val)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={value.phone_number}
            onChangeText={(val) => textUpdatePhoneNumberChange(val)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="account-multiple" color={colors.text} size={20} />
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            name="sex"
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            onChangeText={(val) => textUpdateSexChange(val)}
          >
            <Picker.Item label="Masculin" value="masculin" />
            <Picker.Item label="Feminin" value="feminin" />
          </Picker>
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          {/*<TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            value={value.email}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />*/}
          <Text style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}>{value.email}</Text>
        </View>


        <TouchableOpacity style={styles.commandButton} onPress={() => { editProfileHandler(data.firstname, data.lastname, data.adress_street, data.phone_number, data.sex)}}>
          <Text style={styles.panelButtonTitle}>Modifier</Text>
        </TouchableOpacity>
      </Animated.View>
      </View>
        );
          })) : (
          <div> Aucune donnée</div>
        )
      }
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});

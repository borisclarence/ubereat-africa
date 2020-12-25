//import { StatusBar } from 'expo-status-bar';

import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    Image,
    Picker,
    ImageBackground,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useAuth } from '../context/user-context';

export default function SignupScreen({navigation}) {

  const auth = useAuth();

  if (auth.user) navigation.navigate('root');

  const [selectedValue, setSelectedValue] = React.useState('masculin');

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

  const [data, setData] = React.useState({
        firstname: '',
        lastname: '',
        adress_street: '',
        username: '',
        phone_number: '',
        sex: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        check_nameInputChange: false,
        check_secondnameInputChange: false,
        check_adressInputChange: false,
        check_phoneInputChange: false,
        check_sexInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isFirstname: true,
        isLastname: true,
        isAdress_street: true,
        isUsername: true,
        isPhone_number: true,
        isSex: true,
        isEmail: true,
        isPassword: true,
        confirm_password: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }


    const textNameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                firstname: val,
                check_nameInputChange: true,
                isFirstname:true
            });
        } else {
            setData({
                ...data,
                firstname: val,
                check_nameInputChange: false,
                isFirstname:false
            });
        }
    }

    const textSecondNameChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                check_secondnameInputChange: true,
                isLastname: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_secondnameInputChange: false,
                isLastname: false
            });
        }
    }

    const textAdresseUserChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                adress_street: val,
                check_adressInputChange: true,
                isAdress_street: true
            });
        } else {
            setData({
                ...data,
                adress_street: val,
                check_adressInputChange: false,
                isAdress_street: false
            });
        }
    }

    const textPhoneChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                phone_number: val,
                check_phoneInputChange: true,
                isPhone_number: true
            });
        } else {
            setData({
                ...data,
                phone_number: val,
                check_phoneInputChange: false,
                isPhone_number: false
            });
        }
    }

    const textSexChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                sex: val,
                check_sexInputChange: true,
                isSex: true
            });
        } else {
            setData({
                ...data,
                sex: val,
                check_sexInputChange: false,
                isSex: false
            });
        }
    }

    const textEmailChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
                isEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isEmail: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        /*setData({
            ...data,
            password: val
        });*/
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const registerHandle = async (firstname, lastname, adress_street, phone_number, sex, email, password) => {

        /*const foundUser = Users.filter( item => {
            return userName == item.username && password == item.password;
        } );*/

        /*if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }*/

        /*if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }*/
        //signIn(foundUser);
        const state_user = "Up";
        const profil = "client";
        const is_active = 1;
        const created_at = currentDate;
        await auth.signup(data.firstname, data.lastname, data.adress_street, data.phone_number, data.sex, profil, data.email, data.password, state_user, is_active, created_at);
              console.log("test");
              navigation.navigate('root');


    }

  return (
    <View style={styles.container}>
       <StatusBar backgroundColor='#009387' barStyle="light-content"/>
       <View style={styles.header}>
           <Image
                   source={require('../../assets/eboofftransparent.png')}
                   style={styles.logo}
              />
       </View>
       <Animatable.View
           animation="fadeInUpBig"
           style={styles.footer}
       >
           <ScrollView>
           <Text style={styles.text_footer}>Nom</Text>
           <View style={styles.action}>
               <FontAwesome
                   name="user-o"
                   color="#05375a"
                   size={20}
               />
               <TextInput
                   placeholder="Entrez le nom"
                   style={styles.textInput}
                   autoCapitalize="none"
                   onChangeText={(val) => textNameChange(val)}
               />
               {data.check_nameInputChange ?
               <Animatable.View
                   animation="bounceIn"
               >
                   <Feather
                       name="check-circle"
                       color="green"
                       size={20}
                   />
               </Animatable.View>
               : null}
           </View>
           { data.isFirstname ? null :
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>Renseignez au moins 8 caractères.</Text>
           </Animatable.View>
           }

           <Text style={[styles.text_footer, {
               marginTop: 25
           }]}>Prénom</Text>
           <View style={styles.action}>
               <FontAwesome
                   name="user-o"
                   color="#05375a"
                   size={20}
               />
               <TextInput
                   placeholder="Entrez le Prénom"
                   style={styles.textInput}
                   autoCapitalize="none"
                   onChangeText={(val) => textSecondNameChange(val)}
               />
               {data.check_secondnameInputChange ?
               <Animatable.View
                   animation="bounceIn"
               >
                   <Feather
                       name="check-circle"
                       color="green"
                       size={20}
                   />
               </Animatable.View>
               : null}
           </View>
           { data.isLastname ? null :
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>Renseignez au moins 8 caractères.</Text>
           </Animatable.View>
           }

           <Text style={[styles.text_footer, {
               marginTop: 25
           }]}>Adresse mail</Text>
           <View style={styles.action}>
               <FontAwesome
                   name="envelope"
                   color="#05375a"
                   size={20}
               />
               <TextInput
                   placeholder="Entrez l'adresse mail"
                   style={styles.textInput}
                   autoCapitalize="none"
                   onChangeText={(val) => textEmailChange(val)}
               />
               {data.check_emailInputChange ?
               <Animatable.View
                   animation="bounceIn"
               >
                   <Feather
                       name="check-circle"
                       color="green"
                       size={20}
                   />
               </Animatable.View>
               : null}
           </View>
           { data.isEmail ? null :
           <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={styles.errorMsg}>Renseignez correctement l'adresse mail.</Text>
           </Animatable.View>
           }

           <Text style={[styles.text_footer, {
               marginTop: 25
           }]}>Password</Text>
           <View style={styles.action}>
               <Feather
                   name="lock"
                   color="#05375a"
                   size={20}
               />
               <TextInput
                   placeholder="Entrez le mot de passe"
                   secureTextEntry={data.secureTextEntry ? true : false}
                   style={styles.textInput}
                   autoCapitalize="none"
                   onChangeText={(val) => handlePasswordChange(val)}
               />
               <TouchableOpacity
                   onPress={updateSecureTextEntry}
               >
                   {data.secureTextEntry ?
                   <Feather
                       name="eye-off"
                       color="grey"
                       size={20}
                   />
                   :
                   <Feather
                       name="eye"
                       color="grey"
                       size={20}
                   />
                   }
               </TouchableOpacity>
           </View>
           { data.isPassword ? null :
               <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Renseignez au moins 8 caractères.</Text>
               </Animatable.View>
           }

           <Text style={[styles.text_footer, {
               marginTop: 25
           }]}>Confirm Password</Text>
           <View style={styles.action}>
               <Feather
                   name="lock"
                   color="#05375a"
                   size={20}
               />
               <TextInput
                   placeholder="Confirm votre mot de passe"
                   secureTextEntry={data.confirm_secureTextEntry ? true : false}
                   style={styles.textInput}
                   autoCapitalize="none"
                   onChangeText={(val) => handleConfirmPasswordChange(val)}
               />
               <TouchableOpacity
                   onPress={updateConfirmSecureTextEntry}
               >
                   {data.secureTextEntry ?
                   <Feather
                       name="eye-off"
                       color="grey"
                       size={20}
                   />
                   :
                   <Feather
                       name="eye"
                       color="grey"
                       size={20}
                   />
                   }
               </TouchableOpacity>
           </View>

           <View style={styles.button}>
               <TouchableOpacity
                   style={styles.signIn}
                   onPress={() => {registerHandle(data.firstname, data.lastname, data.adress_street, data.phone_number, data.sex, data.email, data.password)}}
               >
               <LinearGradient
                   colors={['#08d4c4', '#01ab9d']}
                   style={styles.signIn}
               >
                   <Text style={[styles.textSign, {
                       color:'#fff'
                   }]}>Inscription</Text>
               </LinearGradient>
               </TouchableOpacity>

               <TouchableOpacity
                   //onPress={() => navigation.goBack()}
                   onPress={() => navigation.navigate('Signin')}
                   /*style={[styles.signIn, {
                       borderColor: '#009387',
                       borderWidth: 1,
                       marginTop: 15
                   }]}*/
               >
                   <Text style={[styles.textSignNot, {
                       color: '#009387'
                   }]}>Vous avez un compte? Connectez-vous</Text>
               </TouchableOpacity>
           </View>
           </ScrollView>
       </Animatable.View>
     </View>
  );
}


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#009387'
    },
    header: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
        flex: 4.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
        width: height_logo,
        height: height_logo,
        //backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textSignNot: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold'
    }
  });

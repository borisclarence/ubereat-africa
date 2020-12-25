import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookmarkScreen = () => {
    return (
      <View>
      <View style={styles.container}>
      <Text style={styles.text_footer}>Rue/Quartier</Text>
      <View style={styles.action}>
          <FontAwesome
              name="home"
              color="#05375a"
              size={20}
          />
          <TextInput
              placeholder="Entrez votre Numéro de rue"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textAdresseUserChange(val)}
          />
          {data.check_adressInputChange ?
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
      { data.isAdress_street ? null :
      <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorMsg}>Renseignez correctement la rue .</Text>
      </Animatable.View>
      }

      <Text style={styles.text_footer}>Téléphone</Text>
      <View style={styles.action}>
          <FontAwesome
              name="phone"
              color="#05375a"
              size={20}
          />
          <TextInput
              placeholder="Entrez le contact"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textPhoneChange(val)}
          />
          {data.check_phoneInputChange ?
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
      { data.isPhone_number ? null :
      <Animatable.View animation="fadeInLeft" duration={500}>
      <Text style={styles.errorMsg}>Renseignez au moins 8 caractères.</Text>
      </Animatable.View>
      }

      <Text style={styles.text_footer}>Sexe</Text>
      <View style={styles.action}>

      <FontAwesome
          name="user-o"
          color="#05375a"
          size={20}
      />
          <Picker
           selectedValue={selectedValue}
           style={{ height: 50, width: 150, backgroundColor: 'grey' }}
           name="sex"
           onValueChange={(itemValue) => setSelectedValue(itemValue)}
         >
           <Picker.Item label="Masculin" value="masculin" />
           <Picker.Item label="Feminin" value="feminin" />
         </Picker>
      </View>
      </View>

      /* test data missingn */
      <Animatable.View
          style={[styles.footer, {
              backgroundColor: colors.background
          }]}
          animation="fadeInUpBig"
      >
          <Text style={[styles.title, {
              color: colors.text
          }]}>Bienvenue sur ebooff!</Text>
          <Text style={styles.text}>Connexion/Inscription</Text>
          <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
              <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>Connexion</Text>
                  <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                  />
              </LinearGradient>
          </TouchableOpacity>
          </View>
          <View style={styles.button}>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
              <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>Inscription</Text>
                  <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                  />
              </LinearGradient>
          </TouchableOpacity>
          </View>
      </Animatable.View>
      </View>

      /*<View style={styles.cardsWrapper}>
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
      </View>*/
    );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class User {
  constructor(id, firstname, lastname, adress_street, sex, phone_number,
    picture, email, password, is_active, state_user, profile_id, created_at) {
    this.id: id;
    this.firstname: firstname;
    this.lastname: lastname;
    this.adress_street: adress_street;
    this.sex: sex;
    this.phone_number: phone_number;
    this.picture: picture;
    this.email: email;
    this.password: password;
    this.is_active: is_active;
    this.state_user: state_user;
    this.profile_id: profile_id;
    this.created_at: created_at;
  }
}

module.exports = User;

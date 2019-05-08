"use strict";

/* 
  data class to handle the data related to the app
 */
class Data {
  /* 
    constructor which sets the data related to the app to null and binds relevant methods this
   */
  constructor() {
    this.users = null;
    this.filteredUsers = null;
    this.currentModalUser = null;

    this.setActiveModalUsingImg = this.setActiveModalUsingEmail.bind(this);
    this.getNextUserInfo = this.getNextUserInfo.bind(this);
    this.getPreviousUserInfo = this.getPreviousUserInfo.bind(this);
    this.filterUsersByName = this.filterUsersByName.bind(this);
  }

  /* 
    Returns the next user object in the filteredUser. If end of filteredUser returns null
   */
  getNextUserInfo() {
    const currentUserEmail = this.currentModalUser.email;
    // gets the current modal user index in the filteredUser based on the email adress as it is unique
    const currentUserIndex = this.filteredUsers.findIndex(
      user => user.email === currentUserEmail
    );

    if (currentUserIndex < this.filteredUsers.length - 1) {
      return this.filteredUsers[currentUserIndex + 1];
    }

    return null;
  }

  /* 
    Returns the previous user object in the filteredUser. If beginning of filteredUser returns null
   */
  getPreviousUserInfo() {
    const currentUserEmail = this.currentModalUser.email;
    /* 
    Returns the next user object in the filteredUser. If end of filtere list returns null
   */
    const currentUserIndex = this.filteredUsers.findIndex(
      user => user.email === currentUserEmail
    );

    if (currentUserIndex > 0) {
      return this.filteredUsers[currentUserIndex - 1];
    }

    return null;
  }

  /* 
    Filters the users array based on a user's first and last name. Sets the the filteredUser array to the filtered user
   */
  filterUsersByName(query) {
    this.filteredUsers = this.users.filter(user =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }

  /* 
    takes in a dob string in the format 1975-11-12T06:34:44Z and returns it int format month/date/year
   */
  formatDob(dob) {
    return `${dob[5] + dob[6]}/${dob[8] + dob[9]}/${dob[0] +
      dob[1] +
      dob[2] +
      dob[3]}`;
  }

  /* 
    Formats a 10 digit phone number string in the format (111)111-1111 and returns the formated string
    from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript 
  */

  formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ")" + match[2] + "-" + match[3];
    }
    return null;
  }

  /* 
    async method which takes in the number of user and nationalities array, fetches random users based on them and
    sets the users array and filteredUser array to the returned array of user objects. Also formats the phone number
    and birthday of each of the  user object
   */
  async setUsers(numberOfUsers = 12, nationalities = ["us"]) {
    const concatedNationalities = nationalities.join();
    const apiEndPoint = `https://randomuser.me/api/1.2/?results=${numberOfUsers}&nat=${concatedNationalities}`;
    try {
      const response = await fetch(apiEndPoint);
      this.users = await response.json().then(data => data.results);
      this.users.forEach(user => {
        user.phone = this.formatPhoneNumber(user.phone);
        user.dob.date = this.formatDob(user.dob.date);
      });
      this.filteredUsers = this.users;
    } catch (error) {
      throw error;
    }
  }

  /* 
    take in an email string and sets the currentModalUser to the user object in the filteredUser array which has the 
    same email as the email string
   */
  setActiveModalUsingEmail(emailString) {
    const selectedUser = this.filteredUsers.filter(
      user => user.email === emailString
    )[0];
    this.currentModalUser = selectedUser;
  }
}

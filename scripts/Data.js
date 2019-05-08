"use strict";

class Data {
  constructor() {
    this.users = null;
    this.filteredUsers = null;
    this.currentModalUser = null;

    this.setActiveModalUsingImg = this.setActiveModalUsingEmail.bind(this);
    this.getNextUserInfo = this.getNextUserInfo.bind(this);
    this.getPreviousUserInfo = this.getPreviousUserInfo.bind(this);
    this.filterUsersByName = this.filterUsersByName.bind(this);
  }

  getNextUserInfo() {
    const currentUserEmail = this.currentModalUser.email;
    const currentUserIndex = this.filteredUsers.findIndex(
      user => user.email === currentUserEmail
    );

    if (currentUserIndex < this.filteredUsers.length - 1) {
      return this.filteredUsers[currentUserIndex + 1];
    }

    return null;
  }

  getPreviousUserInfo() {
    const currentUserEmail = this.currentModalUser.email;
    const currentUserIndex = this.filteredUsers.findIndex(
      user => user.email === currentUserEmail
    );

    if (currentUserIndex > 0) {
      return this.filteredUsers[currentUserIndex - 1];
    }

    return null;
  }

  filterUsersByName(query) {
    console.log(query);
    this.filteredUsers = this.users.filter(user =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    console.log(this.filteredUsers);
  }

  formatDob(dob) {
    return `${dob[5] + dob[6]}/${dob[8] + dob[9]}/${dob[0] +
      dob[1] +
      dob[2] +
      dob[3]}`;
  }

  // from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ")" + match[2] + "-" + match[3];
    }
    return null;
  }

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

  setActiveModalUsingEmail(emailString) {
    const selectedUser = this.filteredUsers.filter(
      user => user.email === emailString
    )[0];
    this.currentModalUser = selectedUser;
  }
}

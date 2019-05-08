"use strict";

class Data {
  constructor() {
    this.users = null;
    this.filteredUsers = null;
    this.currentModalUser = null;

    this.setActiveModalUsingImg = this.setActiveModalUsingImg.bind(this);
    this.updateCurrentModalInfo = this.updateCurrentModalInfo.bind(this);
  }

  formatDob(dob) {
    const birthDate = new Date(dob);
    return `${birthDate.getMonth()}/${birthDate.getDate()}/${
      birthDate.getFullYear()
    }`;
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
      this.filteredUsers = this.users;
    } catch (error) {
      throw error;
    }
  }

  setActiveModalUsingImg(imgSrcString){
    const selectedUser = (this.filteredUsers.filter((user) => user.picture.medium === imgSrcString))[0];
    this.updateCurrentModalInfo(selectedUser);
  }

  updateCurrentModalInfo(user){
    user.phone = this.formatPhoneNumber(user.phone);
    user.dob.date = this.formatDob(user.dob.date);

    this.currentModalUser =  user;
  }
}

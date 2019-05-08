"use strict"

class Data{
    constructor(){
        this.users = null;
        this.filteredUsers =  null;
        this.currentModalInfo = null;
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
      
}
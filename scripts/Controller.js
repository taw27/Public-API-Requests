"user strict"

class Controller{
    constructor(){
        this.data = new Data();
        this.view = new View();
    }

    async createPage(numberOfUsers = 12, nationalities = ["us"]){
        try{
            await this.data.setUsers(numberOfUsers, nationalities);
            this.view.updateUsersOnPage(this.data.users);
        } catch(error){
            throw error;
        }
    }
}
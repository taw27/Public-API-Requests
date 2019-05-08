"user strict";

class Controller {
  constructor() {
    this.data = new Data();
    this.view = new View();

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleNextUserSelection = this.handleNextUserSelection.bind(this);
    this.handlePreviousUserSelection = this.handlePreviousUserSelection.bind(
      this
    );
    this.handleSearch = this.handleSearch.bind(this);
  }

  async createPage(numberOfUsers = 12, nationalities = ["us"]) {
    try {
      await this.data.setUsers(numberOfUsers, nationalities);
      this.view.updateUsersOnPage(this.data.users);
      this.view.appendSearchform();
      this.setEventHandlers();
    } catch (error) {
      throw error;
    }
  }

  setEventHandlers() {
    this.setModalEvents();
    this.view.searchContainer.querySelector('#search-submit').addEventListener("click", this.handleSearch);
    this.view.searchContainer.querySelector('#search-input').addEventListener('keyup', this.handleSearch);
  }

  setModalEvents() {
    this.view.galleryContainer.addEventListener("click", this.handleCardClick);
    this.view.modalContainer
      .querySelector("#modal-close-btn")
      .addEventListener("click", this.handleModalClose);

    this.view.modalContainer
      .querySelector("#modal-next")
      .addEventListener("click", this.handleNextUserSelection);

    this.view.modalContainer
      .querySelector("#modal-prev")
      .addEventListener("click", this.handlePreviousUserSelection);
  }

  handleCardClick(event) {
    const closestCardAncestor = event.target.closest(".card");
    if (closestCardAncestor) {
      this.data.setActiveModalUsingEmail(
        closestCardAncestor.querySelector(".email").innerText
      );
      this.view.showModal(this.data.currentModalUser);
    }
  }

  handleModalClose(event) {
    this.data.currentModalUser = null;
    this.view.hideModal();
  }

  handleSearch(event){
      event.preventDefault();
      if(event.target.tagName === 'INPUT'){
          const searchQuery =  this.view.searchContainer.querySelector('#search-input').value;
          this.data.filterUsersByName(searchQuery);
          this.view.updateUsersOnPage(this.data.filteredUsers);
      }
  }

  handleNextUserSelection(event) {
    const nextUser = this.data.getNextUserInfo();

    if (nextUser) {
      this.data.currentModalUser = nextUser;
      this.view.updateModalInfo(this.data.currentModalUser);
    }
  }

  handlePreviousUserSelection(event) {
    const previousUser = this.data.getPreviousUserInfo();

    if (previousUser) {
      this.data.currentModalUser = previousUser;
      this.view.updateModalInfo(this.data.currentModalUser);
    }
  }
}

"user strict";

class Controller {
  constructor() {
    this.data = new Data();
    this.view = new View();

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async createPage(numberOfUsers = 12, nationalities = ["us"]) {
    try {
      await this.data.setUsers(numberOfUsers, nationalities);
      this.view.updateUsersOnPage(this.data.users);
      this.setEventHandlers();
    } catch (error) {
      throw error;
    }
  }

  setEventHandlers() {
    this.setModalEvents();
  }

  setModalEvents() {
    this.view.galleryContainer.addEventListener("click", this.handleCardClick);
    this.view.modalContainer
      .querySelector("#modal-close-btn")
      .addEventListener("click", this.handleModalClose);
  }

  handleCardClick(event) {
    const closestCardAncestor = event.target.closest(".card");
    if (closestCardAncestor) {
      this.data.setActiveModalUsingImg(
        closestCardAncestor.querySelector("img").src
      );
      this.view.showModal(this.data.currentModalUser);
    }
  }

  handleModalClose(event) {
    this.data.currentModalUser = null;
    this.view.hideModal();
  }
}

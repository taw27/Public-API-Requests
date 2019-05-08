"user strict";

/* 
    Controller class that handles the app functionality buy connecting the data to the views
 */
class Controller {
  /* 
        constructor instantiates the Data and View classes and binds necessary method to the objects this
     */
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

  /* 
    async method which takes in thr number of users and desired nationality of the user as parameters. Initialises the page
     by fetching the user in the data object with the number of users with desired nationality, uses the view to display
     it to the page. Also appends the search and sets all the necessary event handlers
   */
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

  /* 
    Sets all the event handlers related to the app
   */
  setEventHandlers() {
    this.setModalEvents();
    this.view.searchContainer
      .querySelector("#search-submit")
      .addEventListener("click", this.handleSearch);
    this.view.searchContainer
      .querySelector("#search-input")
      .addEventListener("keyup", this.handleSearch);
  }

  /* 
    Sets modal related event handlers such as the click event to the cards to display the modals, the modal closing
    when clicking the close icon, the clicking of the next and previous button on the modal to display the next and previous 
    users
   */
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

  /* 
    handler for the event of clicking on an employee card. It sets the current modal in the data object and displays the 
    clicked user in the modal using the view
   */
  handleCardClick(event) {
    const closestCardAncestor = event.target.closest(".card");
    if (closestCardAncestor) {
      this.data.setActiveModalUsingEmail(
        closestCardAncestor.querySelector(".email").innerText
      );
      this.view.showModal(this.data.currentModalUser);
    }
  }

  /* 
    handler for the event of clicking the close icon on the modal. It sets the current modal in the data object to null and hides 
    the modal using the view
   */
  handleModalClose(event) {
    this.data.currentModalUser = null;
    this.view.hideModal();
  }

  /* 
    handler for the event of typing in the search input or clicking the submit search input.
    it sets the filtered list in the data object and displays the relevant card based on the searched name
   */
  handleSearch(event) {
    event.preventDefault();
    if (event.target.tagName === "INPUT") {
      const searchQuery = this.view.searchContainer.querySelector(
        "#search-input"
      ).value;
      this.data.filterUsersByName(searchQuery);
      this.view.filterCards(searchQuery);
    }
  }

  /* 
    handles the event of clicking the next button in the modal. Gets the next user
    in the filtered user array using the data object, sets the curretnmodal in the data object 
    to next user and displays the next user using the view 
   */
  handleNextUserSelection(event) {
    const nextUser = this.data.getNextUserInfo();

    if (nextUser) {
      this.data.currentModalUser = nextUser;
      this.view.updateModalInfo(this.data.currentModalUser);
    }
  }

  /* 
    handles the event of clicking the previous button in the modal. Gets the previous user
    in the filtered user array using the data object, sets the curretnmodal in the data object 
    to previous user and displays the previus user using the view 
   */
  handlePreviousUserSelection(event) {
    const previousUser = this.data.getPreviousUserInfo();

    if (previousUser) {
      this.data.currentModalUser = previousUser;
      this.view.updateModalInfo(this.data.currentModalUser);
    }
  }
}

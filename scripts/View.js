"use strict";

/* 
    View class to handle all view related changes
 */
class View {
  /* 
        Constructor that sets the necessary container and element references, and binds relevant methods this
     */
  constructor() {
    this.galleryContainer = document.querySelector("#gallery");
    this.searchContainer = document.querySelector(".search-container");
    this.modalContainer = this.createModalContainerAndHide();
    this.cards = [];

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateModalInfo = this.updateModalInfo.bind(this);
    this.updateUsersOnPage = this.createUsersOnPage.bind(this);
    this.filterCards = this.filterCards.bind(this);
  }

  /* 
    Appends the search form to the search container
   */
  appendSearchform() {
    this.searchContainer.innerHTML = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
  }

  /* 
  takes in an object with all the user information. Creates a card using the object and appends 
  it to the gallery div
 */
  createUserCardElement(user) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="card-img-container">
             <img class="card-img" src=${
               user.picture.medium
             } alt="profile picture">
         </div>
         <div class="card-info-container">
             <h3 class="card-name cap">${user.name.first} ${user.name.last}</h3>
             <p class="card-text email">${user.email}</p>
             <p class="card-text cap">${user.location.city}, ${
      user.location.state
    }</p>
         </div>`;

    return card;
  }

  /* 
  creates the modal, appends it to the body and hides it
   */
  createModalContainerAndHide() {
    const container = document.createElement("div");
    container.classList.add("modal-container");
    container.innerHTML = `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
          <img class="modal-img" src="" alt="profile picture">
          <h3 class="modal-name cap"></h3>
          <p class="modal-text modal-email"> </p>
          <p class="modal-text cap modal-city"> </p>
          <hr>
          <p class="modal-text modal-phone"> </p>
          <p class="modal-text modal-location cap"> </p>
          <p class="modal-text modal-birthday"></p>
      </div>
      
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>`;

    container.style.display = "none";
    document.body.appendChild(container);

    return document.querySelector("div.modal-container");
  }

  /* 
    takes in an array of user objects, creates cards for each object, appends them to the gallery div and sets
    the user card collections to the created cards
   */
  createUsersOnPage(users) {
    users.forEach(user => {
      const card = this.createUserCardElement(user);
      this.galleryContainer.appendChild(card);
    });

    this.cards = document.querySelectorAll(".card");
  }

  /* 
    takes in a user object and displays the modal for the user
   */
  showModal(user) {
    this.modalContainer.style.display = "inherit";
    this.updateModalInfo(user);
  }

  /* 
    hides the user modal
   */
  hideModal() {
    this.modalContainer.style.display = "none";
  }

  /* 
    Filters the cards in the display using a searchName and displays the matching cards and hides the rest
   */
  filterCards(searchName) {
    Array.from(this.cards).forEach(card => {
      const name = card.querySelector(".card-name").innerText.toLowerCase();
      card.style.display = name.includes(searchName.toLowerCase())
        ? "flex"
        : "none";
    });
  }

  /* 
    takes in a user object and updates the user modal info based on the objects properties
   */
  updateModalInfo(user) {
    const infoContainer = this.modalContainer.querySelector(
      ".modal-info-container"
    );

    infoContainer.querySelector(".modal-img").src = user.picture.medium;
    infoContainer.querySelector(".modal-name").innerText = `${
      user.name.first
    } ${user.name.last}`;
    infoContainer.querySelector(".modal-email").innerText = user.email;
    infoContainer.querySelector(".modal-city").innerText = user.location.city;
    infoContainer.querySelector(".modal-phone").innerText = user.phone;
    infoContainer.querySelector(".modal-location").innerText = `${
      user.location.street
    }, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
    infoContainer.querySelector(".modal-birthday").innerText = `Birthday: ${
      user.dob.date
    }`;
  }
}

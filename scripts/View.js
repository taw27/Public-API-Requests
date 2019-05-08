 class View {
    constructor(){
        this.galleryContainer = document.querySelector("#gallery");
        this.searchContainer = document.querySelector(".search-container");
        this.modalContainer = this.createModalContainerAndHide();

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateModalInfo = this.updateModalInfo.bind(this);
        this.updateUsersOnPage = this.updateUsersOnPage.bind(this);
    }

    createModalContainerAndHide(){
        const container = document.createElement("div");
        container.classList.add("modal-container");
        container.innerHTML = `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
      </div>
      
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>`;
      
        container.style.display = "none";
        document.body.insertBefore(container, document.querySelector("script"));
        
        return document.querySelector("div.modal-container");
    } 

    createUserCardElement(user) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<div class="card-img-container">
             <img class="card-img" src=${user.picture.medium} alt="profile picture">
         </div>
         <div class="card-info-container">
             <h3 id="name" class="card-name cap">${user.name.first} ${
          user.name.last
        }</h3>
             <p class="card-text">${user.email}</p>
             <p class="card-text cap">${user.location.city}, ${
          user.location.state
        }</p>
         </div>`;
      
        return card;
      }

    removeChildElements(parentContainer){
        while (parentContainer.firstChild) {
             parentContainer.removeChild(parentContainer.firstChild);
            }
    }

    
      showModal(user){
          this.modalContainer.style.display = 'inherit';
          this.updateModalInfo(user);
      }

      hideModal(){
        this.modalContainer.style.display = 'none';
      }

      updateModalInfo(user){
          const infoContainer = this.modalContainer.querySelector('.modal-info-container');
          this.removeChildElements(infoContainer);
          const userInfo = ` <img class="modal-img" src=${user.picture.medium} alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.phone}</p>
          <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${user.dob.date}</p>`;

          infoContainer.innerHTML = userInfo;
      }

      updateUsersOnPage(users) {
        this.removeChildElements(this.galleryContainer);
        users.forEach(user => {
          const card = this.createUserCardElement(user);
          this.galleryContainer.appendChild(card);
        });
      }
}


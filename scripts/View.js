 class View {
    constructor(){
        this.galleryContainer = document.querySelector("#gallery");
        this.searchContainer = document.querySelector("#search-container");
        this.modalContainer = this.createModalContainerAndHide();
    }

    createModalContainerAndHide(){
        this.modalContainer = document.createElement("div");
        this.modalContainer.classList.add("modal-container");
        this.modalContainer.innerHTML = `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
      </div>
      
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>`;
      
        this.modalContainer.style.display = "none";
        document.body.insertBefore(this.modalContainer, document.querySelector("script"));
    } 

    updateUsersOnPage(users) {
        this.removeAllUsersFromPage();
        users.forEach(user => {
          const card = this.createUserCardElement(user);
          this.galleryContainer.appendChild(card);
        });
      }
    
    removeAllUsersFromPage(){
        while (this.galleryContainer.firstChild) {
             this.galleryContainer.removeChild(this.galleryContainer.firstChild);
            }
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
}


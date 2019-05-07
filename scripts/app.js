"use strict"

document.addEventListener('DOMContentLoaded', async () => {
    addUsersToPage();
});

async function addUsersToPage(){
    const users = await getRandomUsers();
    const gallery = document.querySelector('#gallery');
    users.forEach((user) => {
        const card = createUserCardElement(user);
        gallery.appendChild(card);
    });
}

function createUserCardElement(user){
    const card = document.createElement('div');
       card.classList.add('card');
       card.innerHTML = `<div class="card-img-container">
       <img class="card-img" src=${user.picture.medium} alt="profile picture">
   </div>
   <div class="card-info-container">
       <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
       <p class="card-text">${user.email}</p>
       <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
   </div>`;

   return card;
}

async function getRandomUsers (numberOfUsers = 12 , nationalities = ['us']){
    const concatedNationalities = nationalities.join();
    const apiEndPoint = `https://randomuser.me/api/1.2/?results=${numberOfUsers}&nat=${concatedNationalities}`;
    try{
        const response = await fetch(apiEndPoint);
        return await response.json().then((data) => data.results);
    }catch(error){
        throw error;
    }
}
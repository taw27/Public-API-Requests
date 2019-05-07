"use strict"

document.addEventListener('DOMContentLoaded', async () => {
    console.log(await getRandomUsers());
});

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
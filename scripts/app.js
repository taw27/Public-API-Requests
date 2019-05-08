"use strict";

/* 
    once dom content has been loaded, creates an instance of the Controller class and calls the method to create the directory webpage
 */
document.addEventListener("DOMContentLoaded", async () => {
  const controller = new Controller();
  await controller.createPage();
});

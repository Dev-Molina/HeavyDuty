document.addEventListener("DOMContentLoaded", function () {
  // Fetch the navigation bar content
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      // Insert the navigation bar into the <body> of the current page
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch(error => console.error("Error fetching navigation bar:", error));
});
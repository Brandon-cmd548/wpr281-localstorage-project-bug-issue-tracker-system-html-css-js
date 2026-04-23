//Selects information in the form
const formSelection = document.getElementById("loginForm")

function resetError() {
    document.getElementById("loginFailMessage").style.color = "white";
}
document.getElementById("uname").onclick = resetError;
document.getElementById("password").onclick = resetError;

formSelection.addEventListener("submit", function(e) {
    //Stops page from reloading
    e.preventDefault()

    //Get data form localstorage
    const storedAdmin = JSON.parse(localStorage.getItem("localAdmin"))

    

    //Gets the values in the form
    const usernameInput = document.getElementById("uname").value.trim()
    const passwordInput = document.getElementById("password").value.trim()

    //Search for a person where data is matched
    const adminExists = storedAdmin.find(person => 
    person.oAdminUsername === usernameInput &&
    person.oAdminPassword === passwordInput
    )

//Verifies that person exists
    if (adminExists) {
        localStorage.setItem("currentUser", JSON.stringify(adminExists))
        window.location.href = "home.html"
        return false;
    }
    else {
        const errorMessage = document.getElementById("loginFailMessage")
        errorMessage.style.color = "rgb(158, 30, 30)"
        return false;
    }
})
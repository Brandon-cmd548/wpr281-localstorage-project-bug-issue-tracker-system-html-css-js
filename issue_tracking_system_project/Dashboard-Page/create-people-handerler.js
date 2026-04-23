// ── INIT PEOPLE FORM ─────────────────────────────────────
function initPeopleForm() {
    const form = document.getElementById("peopleCreation");
    if (!form) return;

    // Reset validation colors
    ["usernameValidation","firstNameValidation","surnameValidation","emailValidation"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.color = "transparent";
    });

    // Clear error on focus
    [
        { input: "uname", validation: "usernameValidation" },
        { input: "fname", validation: "firstNameValidation" },
        { input: "lname", validation: "surnameValidation"  },
        { input: "email", validation: "emailValidation"    }
    ].forEach(pair => {
        const inp = document.getElementById(pair.input);
        const val = document.getElementById(pair.validation);
        if (inp && val) inp.onclick = () => val.style.color = "transparent";
    });

    // Cancel button — go back to dashboard
    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) {
        cancelBtn.onclick = (e) => {
            e.preventDefault();
            showSection('dashboard', document.getElementById('nav-dashboard'));
        };
    }

    // Profile picture upload
    const profilePicture  = document.getElementById("profilePicture");
    const hiddenFileInput = document.getElementById("hiddenFileInput");
    const picture         = document.getElementById("picture");
    const profileText     = document.getElementById("profileText");

    if (profilePicture) {
        profilePicture.onclick = () => hiddenFileInput.click();
    }

    if (hiddenFileInput) {
        hiddenFileInput.onchange = function() {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    picture.src = e.target.result;
                    picture.style.display = "block";
                    profileText.style.display = "none";
                    window.tempProfilePic = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // Form submit
    form.onsubmit = function(e) {
        e.preventDefault();
        submitPerson();
    };
}

function submitPerson() {
    const storedPeople = JSON.parse(localStorage.getItem("localPeople")) || [];

    const usernameInput  = document.getElementById("uname").value.trim();
    const firstNameInput = document.getElementById("fname").value.trim();
    const lastNameInput  = document.getElementById("lname").value.trim();
    const emailInput     = document.getElementById("email").value.trim();

    // Validation
    if (!usernameInput)  { document.getElementById("usernameValidation").style.color  = "rgb(158,30,30)"; return; }
    if (!firstNameInput) { document.getElementById("firstNameValidation").style.color = "rgb(158,30,30)"; return; }
    if (!lastNameInput)  { document.getElementById("surnameValidation").style.color   = "rgb(158,30,30)"; return; }
    if (!emailInput)     { document.getElementById("emailValidation").style.color     = "rgb(158,30,30)"; return; }

    const nextId = storedPeople.length > 0
        ? parseInt(storedPeople[storedPeople.length - 1].oPerID) + 1
        : 1;

    const newPerson = {
        oPerID:       nextId,
        oPerUsername: usernameInput,
        oPerName:     firstNameInput,
        oPerSurname:  lastNameInput,
        oPerEmail:    emailInput,
        oPerPic:      window.tempProfilePic || null
    };

    storedPeople.push(newPerson);
    localStorage.setItem("localPeople", JSON.stringify(storedPeople));

    // Reset form
    document.getElementById("peopleCreation").reset();
    document.getElementById("picture").src = "";
    document.getElementById("picture").style.display = "none";
    document.getElementById("profileText").style.display = "block";
    window.tempProfilePic = null;

    alert(`${firstNameInput} ${lastNameInput} has been created.`);
    showSection('dashboard', document.getElementById('nav-dashboard'));
}
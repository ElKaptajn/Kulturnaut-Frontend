window.addEventListener('load', function () {
    getAllBands();
  })



function signup(event) {
    event.preventDefault()
    console.log("signup kaldt")
    const nameField = document.getElementById("nameField").value;
    const passwordFieldSignup = document.getElementById("passwordFieldSignup").value;
    let payload = {
        username: nameField,
        password: passwordFieldSignup
    };
    payload = JSON.stringify(payload)
    console.log(payload)
    fetch("http://localhost:8080/signup",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json'}
        })
}

function login(event) {
    event.preventDefault()
    const usernameField = document.getElementById("usernameField").value;
    const passwordField = document.getElementById("passwordField").value;
    let payload = {
        username: usernameField,
        password: passwordField
    };
    payload = JSON.stringify(payload)
    fetch("http://localhost:8080/login",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json'}
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            localStorage.setItem('user', JSON.stringify(res));
        })
}

function logout(event) {
    event.preventDefault()
    const div = document.getElementById('container');
    localStorage.removeItem('user')
}

function createBand(event){
    event.preventDefault()
    const bandNameField = document.getElementById("bandNameField").value;

    let payload = {name: bandNameField};

    payload = JSON.stringify(payload);

    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    const inMemoryToken = localstorage_user.token;

    fetch("http://localhost:8080/createBand",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json',
                        'Authorization': 'Bearer ' + inMemoryToken }
        });
}

async function createBandEvent(event){
    event.preventDefault()
    const venueField = document.getElementById("venueField").value;
    const dateField = document.getElementById("dateField").value;
    const bandField = document.getElementById("bandField").value;

    console.log("Band id: " + bandField);

    let payload = {
        venue: venueField,
        date: dateField
    };

    payload = JSON.stringify(payload);

    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    const inMemoryToken = localstorage_user.token;


    await fetch(`http://localhost:8080/createEvent?bandId=${bandField}`,
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json',
                        'Authorization': 'Bearer ' + inMemoryToken }
        });

}


async function getAllBands(){

    let bandOptions = "";

    let responseGetAllBands = await fetch("http://localhost:8080/getAllBands",
    {
        method: "GET",
        headers:{'content-type': 'application/json'}
    });

let bandData = await responseGetAllBands.json();

for (let bandDataIndex in bandData) {
    let entryBand = bandData[bandDataIndex];
    bandOptions += `<option value="${entryBand.id}">${entryBand.name}</option>`;
    }

    document.getElementById("bandField").innerHTML = bandOptions;
}

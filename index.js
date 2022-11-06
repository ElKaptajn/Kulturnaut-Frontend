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

function createEvent(event){
    event.preventDefault()
    const eventField = document.getElementById("eventField").value;

    let payload = {name: eventField};

    payload = JSON.stringify(payload);

    const localstorage_user = JSON.parse(localStorage.getItem('user'));
    const inMemoryToken = localstorage_user.token;

    fetch("http://localhost:8080/createEvent",
        {
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json',
                        'Authorization': 'Bearer ' + inMemoryToken }
        });
}

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
            mode: 'no-cors',
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
            mode: 'no-cors',
            method: "POST",
            body: payload,
            headers:{'content-type': 'application/json'}
        })
}



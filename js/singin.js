const signin = document.getElementById('signin');
const signinform = document.getElementById('signsigninformin');

signin.onsubmit = function() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        window.location.href = 'pages/goods.html';
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    return false;
};
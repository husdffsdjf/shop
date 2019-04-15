firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = './../index.html';
    }
});

const toGoods = document.getElementById('toGoods');
toGoods && toGoods.addEventListener('click', () => {
    window.location = 'goods.html'
}, false);

const toCart = document.getElementById('toCart');
toCart && toCart.addEventListener('click', () => {
    window.location = 'cart.html'
}, false);

const out = document.getElementById('out');
out && out.addEventListener('click', () => {
    firebase.auth().signOut().then(function() {
        localStorage.clear();
        sessionStorage.clear();
        window.location = './../index.html';
    }).catch(function(error) {});
}, false);

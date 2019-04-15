const goodsImage = document.getElementsByClassName('goods-preview')[0];
const title = document.getElementsByClassName('title')[0];
const price = document.getElementsByClassName('price')[0];
const desc = document.getElementsByClassName('desc')[0];

firebase.database().ref('phones').once('value').then(function(snapshot) {
    let items = snapshot.val();
    let purchased = JSON.parse(sessionStorage.getItem('purchased'));
    purchased = purchased || []
    if(purchased.length) {
        purchased.forEach(id => {
            let element = items.find(val => val.id == id);
            createDOMItem(element, document.getElementsByTagName('article')[0], 'remove');
        });
    }
});
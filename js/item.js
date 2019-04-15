const goodsImage = document.getElementsByClassName('goods-preview')[0];
const title = document.getElementsByClassName('title')[0];
const price = document.getElementsByClassName('price')[0];
const desc = document.getElementsByClassName('desc')[0];
const add = document.getElementsByClassName('add-to-cart')[0];

firebase.database().ref('phones').once('value').then(function(snapshot) {
    let items = snapshot.val();
    let id = window.location.search.substr(1).split('=')[1];
    let item = items.filter(val => val.id == id)[0];
    promise = getImageSrc(item.image);
    promise.then(result => {
        goodsImage.src = result;
        goodsImage.alt = item.title;
        title.innerHTML = item.title;
        price.innerHTML = `Ціна: ${item.price}`;
        desc.innerHTML = item.desc;
        let watched = JSON.parse(sessionStorage.getItem('watched'));
        if(!watched) watched = [];
        watched = watched.filter(val => val !== id);
        watched.push(id);
        if(watched.length > 5) watched.shift();
        sessionStorage.setItem('watched', JSON.stringify(watched));
        add.addEventListener('click', (e) => {
            let purchased = JSON.parse(sessionStorage.getItem('purchased'));
            if(!purchased) purchased = [];
            if(!purchased.includes(id)) purchased.push(id);
            sessionStorage.setItem('purchased', JSON.stringify(purchased));
            e.stopPropagation();
        },false);
    }, error => console.log(error));
});
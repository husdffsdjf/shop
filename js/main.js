var config = {
    apiKey: "AIzaSyDBP6P78x1YpqdeaY-2OE9o27YPJft8a4I",
    authDomain: "shop-948b0.firebaseapp.com",
    databaseURL: "https://shop-948b0.firebaseio.com",
    projectId: "shop-948b0",
    storageBucket: "shop-948b0.appspot.com",
    messagingSenderId: "796766622403"
};
firebase.initializeApp(config);

const database = firebase.database();

const storage = firebase.storage();
const storageRef = storage.ref();

function getImageSrc(name) {
    return new Promise((resolve, reject) => {
        storageRef.child('phones/' + name).getDownloadURL().then(function(url) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            resolve(url);
        }).catch(function(error) {
            reject(error);
        });
    })
}

function viewGoods(id) {
    return function () {
        window.location = `item.html?id=${id}`;
    }
}

function createDOMItem(options, el, action) {
    const section = document.createElement('div');
    section.className = 'goods';

    section.addEventListener('click', viewGoods(options.id));

    const h3 = document.createElement('h3');
    h3.innerHTML = options.title;
    section.appendChild(h3);

    const goodsContent = document.createElement('div');
    goodsContent.className = 'goods-content';
    
    const img = document.createElement('img');
    img.className = 'goods-preview';
    promise = getImageSrc(options.image);
    promise.then(result => {
        img.src = result;
        img.alt = options.title;
        goodsContent.appendChild(img);
    }, error => console.log(error));

    section.appendChild(goodsContent);

    const price = document.createElement('p');
    price.className = 'price';
    price.innerHTML = `Ціна: ${options.price}`;
    section.appendChild(price);

    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.innerHTML = options.desc;
    section.appendChild(desc);

    const add = document.createElement('button');
    if(action == 'remove') {
        add.className = 'remove-from-cart';
        add.addEventListener('click', (e) => {
            let purchased = JSON.parse(sessionStorage.getItem('purchased'));
            purchased = purchased.filter(val => val !== options.id);
            sessionStorage.setItem('purchased', JSON.stringify(purchased));
            el.removeChild(section);
            e.stopPropagation();
        },false);
    }
    else {
        add.className = 'add-to-cart';
        add.addEventListener('click', (e) => {
            let purchased = JSON.parse(sessionStorage.getItem('purchased'));
            if(!purchased) purchased = [];
            if(!purchased.includes(options.id)) purchased.push(options.id);
            sessionStorage.setItem('purchased', JSON.stringify(purchased));
            e.stopPropagation();
        },false);
    }
    
    section.appendChild(add);

    el.appendChild(section);
}
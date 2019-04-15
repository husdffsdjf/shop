const itemsPerPage = 4;

let page = 1;
let maxPages = 0;
let goodsOrigin = [];
let goods = [];

const article = document.getElementsByClassName('goods-wrapper')[0];
const recentGoodsWrapper = document.getElementsByClassName('recent-goods-wrapper')[0];
const recentGoods = document.getElementsByClassName('recent-goods')[0];
const numPage = document.getElementById('numPage');
const viewParam = document.getElementById('viewParam');
const sort = document.getElementById('sort');
const colors = Array.from(document.getElementsByName('color'));
const os = Array.from(document.getElementsByName('os'));

firebase.database().ref('phones').once('value').then(function(snapshot) {
    let items = snapshot.val();
    goodsOrigin = items.slice();
    goods = items.slice();
    maxPages = Math.ceil(items.length / itemsPerPage);
    renderGoods();
    renderRecentGoods();
});

function renderRecentGoods() {
    let watched = JSON.parse(sessionStorage.getItem('watched'));
    if(watched && watched.length) {
        recentGoodsWrapper.style = 'display: block;'
        watched.forEach(id => {
            let element = goodsOrigin.find(val => val.id == id);
            createDOMItem(element, recentGoods);
        });
    }
}

function renderGoods() {
    items = goods.slice();
    numPage.innerHTML = `${page} / ${maxPages}`;
    article.innerHTML = '';
    items.forEach((item, index) => {
        if((index >= itemsPerPage * (page - 1)) && (index < itemsPerPage * page)) {
            createDOMItem(item, article);
        }        
    });
}

document.getElementById('prevPage').addEventListener('click', () => {
    if(page > 1) {
        page--;
        renderGoods();
    }
},false)

document.getElementById('nextPage').addEventListener('click', () => {
    if(page < maxPages) {
        page++;
        renderGoods();
    }
},false)

viewParam.onsubmit = () => {
    goods = goodsOrigin.slice();
    let colorsValues = colors.filter(item => item.checked);
    if(colorsValues.length) {
        colorsValues = colorsValues.map(item => item.value);
        goods = goods.filter((value) => {
            return ~colorsValues.indexOf(value.color.toLowerCase());
        });
    }
    let osValues = os.filter(item => item.checked);
    if(osValues.length) {
        osValues = osValues.map(item => item.value);
        goods = goods.filter((value) => {
            return ~osValues.indexOf(value.os.toLowerCase());
        });
    }
    if(sort.value === 'increase') {
        goods.sort((a,b) => a.price - b.price);
    }
    if(sort.value === 'decrease') {
        goods.sort((a,b) => b.price - a.price);
    }
    maxPages = Math.ceil(goods.length / itemsPerPage);
    page = 1;
    renderGoods();
    return false;
};
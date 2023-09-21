let symbols = document.querySelectorAll('.symbol');
let buttons = document.querySelectorAll('.cart-price');
let minus = document.querySelectorAll('.only-minus');
let cartPrice = document.getElementsByClassName('cart-div');
let content = document.querySelector('.content');
let itemsList = document.getElementById('items-list');
let toggle = false;

localStorage.clear();
localStorage.setItem("price",0);    // using localstorage to store the total price
localStorage.setItem("quantity",0); // using localstorage to store the total quantities

// the functionality for plus and minus symbols where no of items can be added to our cart
symbols.forEach((symbol)=> {
    symbol.addEventListener('click', function(event) {
        let val = event.target.parentNode.childNodes[3].value;
        if (event.target.classList.contains('fa-plus')) {
            val++;
        } else {
            val--;

            // you can't decrease the value beyond 1 
            if (val<2) {
                event.target.parentNode.childNodes[1].style.opacity = 0.3;
                event.target.parentNode.childNodes[1].style.cursor = 'not-allowed';
            }
        }
        event.target.parentNode.childNodes[3].value = val>=1?val:1;

        // the mouse will work only when you want the number of items to be increased
        if (val>1) {
            event.target.parentNode.childNodes[1].style.opacity = 1;
            event.target.parentNode.childNodes[1].style.cursor = 'pointer';
        }
    });
});

// by using add to cart button we are storing items in our cart
buttons.forEach((button)=> {
    button.addEventListener('click', function(event) {
        let qty = parseInt(localStorage.getItem("quantity"));
        
        // if quantity is already 8 the cart item can't be increased
        if (qty == 8) {
            showWarning();
            return;
        }
        let price = parseInt(localStorage.getItem("price"));
        let title = event.target.parentNode.childNodes[1].innerText;
        let initialQty = parseInt(event.target.parentNode.childNodes[5].childNodes[3].value);
        let initialPrice = initialQty*parseInt(event.target.parentNode.childNodes[3].innerText.substring(3));
        if (initialQty < 1) {
            alert('Negative numbers not allowed');
            return;
        }

        qty += initialQty;

        if (qty>8) {
            showWarning();
            return;
        }
        price += initialPrice;
        localStorage.setItem("quantity",qty);
        localStorage.setItem("price", price);
        document.getElementById('total-price').innerText = localStorage.getItem('price');
        document.getElementById('total-quantity').innerText = localStorage.getItem('quantity');
        addToList(title,initialQty,initialPrice);
    });
});

function showWarning() {
    alert('Can\'t add more than 8');
}

function openDiv() {
    content.style.visibility = 'visible';
    toggle = false;
}

function closeDiv() {
    content.style.visibility = 'hidden';
}

// this is to update the cart item in the shopping cart
function addToList(title, initialQty, initialPrice) {
    itemsList.childNodes.forEach((node)=> {
        if (node.childNodes[0].innerHTML.substring(0,11).indexOf(title)>-1) {
            node.remove();
        }
    });
    let li = document.createElement('li');
    if (localStorage.getItem(title) == null) {
        let obj = {
            "initialPrice": 0,
            "initialQty": 0
        };
        window.localStorage.setItem(title, JSON.stringify(obj));
    }

    let o = JSON.parse(localStorage.getItem(title));
    initialQty += parseInt(o['initialQty']);
    initialPrice += parseInt(o['initialPrice']);
    o['initialQty'] = initialQty;
    o['initialPrice'] = initialPrice;
    localStorage.setItem(title,JSON.stringify(o));
    li.innerHTML = `<span>${title} ${initialQty} ${initialPrice} <i class="fa-solid fa-trash trash-symbol" onclick="eraseElement(event)"></i></span>`;
    itemsList.appendChild(li);
}

// if we don't want any item to be chosen for checkout we can simply erase it 
function eraseElement(event) {
    let title = event.target.parentNode.childNodes[0].textContent.substring(0,11);
    let qty = parseInt(event.target.parentNode.childNodes[0].textContent.substring(11,13));
    let price = parseInt(event.target.parentNode.childNodes[0].textContent.substring(13));
    itemsList.childNodes.forEach((node)=> {
        if (node.childNodes[0].innerHTML.substring(0,11).indexOf(title)>-1) {
            node.remove();
        }
    });
    localStorage.setItem("quantity",localStorage.getItem("quantity")-qty);
    localStorage.setItem("price", localStorage.getItem('price')-price);
    localStorage.removeItem(title);
    document.getElementById('total-price').innerText = localStorage.getItem('price');
    document.getElementById('total-quantity').innerText = localStorage.getItem('quantity');
}

document.addEventListener('click', function(event) {
    if (toggle && event.target !== document.querySelector('.content')) {
        closeDiv();
    }
    toggle = true;
});
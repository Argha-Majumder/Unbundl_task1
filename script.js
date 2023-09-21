let symbols = document.querySelectorAll('.symbol');
let buttons = document.querySelectorAll('.cart-price');
let minus = document.querySelectorAll('.only-minus');
let cartPrice = document.getElementsByClassName('cart-div');
let toggle = false;

localStorage.setItem("price",0);
localStorage.setItem("quantity",0);

symbols.forEach((symbol)=> {
    symbol.addEventListener('click', function(event) {
        let val = event.target.parentNode.childNodes[3].value;
        if (event.target.classList.contains('fa-plus')) {
            val++;
        } else {
            val--;
            if (val<2) {
                event.target.parentNode.childNodes[1].style.opacity = 0.3;
                event.target.parentNode.childNodes[1].style.cursor = 'not-allowed';
            }
        }
        event.target.parentNode.childNodes[3].value = val>=1?val:1;
        if (val>1) {
            event.target.parentNode.childNodes[1].style.opacity = 1;
            event.target.parentNode.childNodes[1].style.cursor = 'pointer';
        }
    });
});

buttons.forEach((button)=> {
    button.addEventListener('click', function(event) {
        let qty = parseInt(localStorage.getItem("quantity"));
        
        if (qty == 8) {
            showWarning();
            return;
        }
        let initialPrice = parseInt(localStorage.getItem("price"));
        let initialQty = parseInt(event.target.parentNode.childNodes[5].childNodes[3].value);
        
        if (initialQty < 1) {
            alert('Negative numbers not allowed');
            return;
        }

        qty += initialQty;

        if (qty>8) {
            showWarning();
            return;
        }
        initialPrice += initialQty*parseInt(event.target.parentNode.childNodes[3].innerText.substring(3));
        localStorage.setItem("quantity",qty);
        localStorage.setItem("price", initialPrice);
        document.getElementById('total-price').innerText = localStorage.getItem('price');
        document.getElementById('total-quantity').innerText = localStorage.getItem('quantity');
    });
});

function showWarning() {
    alert('Can\'t add more than 8');
}

function openDiv() {
    document.querySelector('.content').style.visibility = 'visible';
    toggle = false;
}

function closeDiv() {
    document.querySelector('.content').style.visibility = 'hidden';
}

document.addEventListener('click', function(event) {
    if (toggle && event.target !== document.querySelector('.content')) {
        closeDiv();
    }
    toggle = true;
});
let symbols = document.querySelectorAll('.symbol');
let buttons = document.querySelectorAll('.cart-price');
let minus = document.querySelectorAll('.only-minus');

localStorage.setItem("price",0);
localStorage.setItem("quantity",0);

symbols.forEach((symbol)=> {
    symbol.addEventListener('click', function(event) {
        let val = event.target.parentNode.childNodes[3].value;
        let initialPrice = parseInt(localStorage.getItem("price"));
        let qty = localStorage.getItem("quantity");
        if (event.target.classList.contains('fa-plus')) {
            if (qty>8) {
                showWarning();
            } else {
                val++;
                qty++;
                initialPrice += parseInt(event.target.parentNode.parentNode.childNodes[3].innerText.substring(3));
            }
        } else {
            val--;
            if (val<2) {
                event.target.parentNode.childNodes[1].style.opacity = 0.3;
                event.target.parentNode.childNodes[1].style.cursor = 'not-allowed';
            } else {
                qty--;
                initialPrice -= parseInt(event.target.parentNode.parentNode.childNodes[3].innerText.substring(3));
            }
        }
        localStorage.setItem("quantity",qty);
        localStorage.setItem("price",initialPrice);
        event.target.parentNode.childNodes[3].value = val;
        if (val>1) {
            event.target.parentNode.childNodes[1].style.opacity = 1;
            event.target.parentNode.childNodes[1].style.cursor = 'pointer';
        }
    });
});

buttons.forEach((button)=> {
    button.addEventListener('click', function(event) {
        console.log(event.target);
    });
});
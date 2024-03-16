// variables

const partOfText = document.querySelectorAll('.showPart')
const moreButton = document.querySelectorAll('.readMore')
const quantities = document.querySelectorAll(".clients__quantity__digit");
const form = document.querySelector(".footer__form");
const email = document.querySelector(".email__input");
const carts = document.querySelectorAll(".cart");
const cartOutput = document.querySelector(".nav__cart__link")
let quantityOfBuyedCourses = 0;
let indexOfTexts = 0;

// the code

let data = {
    customers : 15000,
    visitors : 150000,
    countries : 15,
    partners : 100
}
function hideText(elem, button){
    let isTextHide = 1;
    return function(){
        

        if(isTextHide == 1){
            elem.style.display = "block"
            button.innerHTML = 'Hide <img src="./assets/icons/arrow.svg" alt="arrow-right">'
            isTextHide--
        }else{
            elem.style.display = "none"
            button.innerHTML = 'Read more <img src="./assets/icons/arrow.svg" alt="arrow-right">'
            isTextHide++
        }
    }
    
}

function formatNumber(num) {
    if(num >= 100 && num < 1000){
        return `${num}+`
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    } 
    return num.toString();
}


quantities.forEach(elem => {
    let title = data[elem.getAttribute("title")]
    let value = formatNumber(title);
    elem.textContent = value
});

moreButton.forEach(item => {
    item.addEventListener('click', hideText(partOfText[indexOfTexts], item));
    indexOfTexts++
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(email.value == ""){
        alert("Это поле не может быть пустым")
        return;
    }
    else if(!(email.value).includes("@")){
        alert("Email должен содержать символ собачки : '@'");
        return;
    }

    console.log(`email: "${email.value}"`)
})

carts.forEach(item => {
    item.addEventListener("click", function addCart(){
        item.style.transform = "rotate(360deg)";
        item.style.width = "44px";
        item.style.height = "44px";
        item.style.padding = "0px";
        item.setAttribute("src", "./assets/icons/success.svg");
        quantityOfBuyedCourses++;
        item.removeEventListener("click", addCart);
        item.addEventListener("click", function deleteCart(){
            item.style.transform = "rotate(-360deg)";
            item.style.width = "auto";
            item.style.height = "auto";
            item.style.padding = "10px";
            item.setAttribute("src", "./assets/icons/cart.svg")
            quantityOfBuyedCourses--;
            item.removeEventListener("click", deleteCart);
            item.addEventListener("click", addCart)
        })
    })
})

cartOutput.addEventListener("click", ()=>{
    console.log(`Количество курсов в корзине: ${quantityOfBuyedCourses}`)
})
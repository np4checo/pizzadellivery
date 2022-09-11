let modalQt = 1;
let cart = [];
let modalKey = 0
const c = (element)=>document.querySelector(element) // utilizando arrow function
const ca = (element)=>document.querySelectorAll(element);


pizzaJson.map(function(item, index){ //1parametro: a array retornada, 2parametro; a posição de cara elemento
    let pizzaItem = c('.models .pizza-item').cloneNode(true); // cloneNode faz com clone ;; entrou em models e pegou pizza-item

    // adicionar informações das pizzas nos respectivos clones:
    pizzaItem.setAttribute('data-key', index); //setou um atributo data-key(customizado) e passou o valor do index para cada um dos clones, individualmente
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name // para cada clone, acessa a div responsável pelo nome das pizzas e innerHTML para o name da array criada pelo map
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}` // template string para colocar R$, e toFixed(2) para usar 2 alg dps da virgula
    pizzaItem.querySelector('a').addEventListener('click', (event)=>{ //eventListener adiciona um evento ;; 1par> qual evento? 2par>a função que será executada
        event.preventDefault(); // previna a ação padrão do evento
        let key = event.target.closest('.pizza-item').getAttribute('data-key'); // faz que com ao clicar, pegue o atributo mais "closest" da tag 'a'
        modalQt = 1;
        modalKey = key // modalKey é uma forma de armazenar as informações da pizza em que está clicando, porque a var key está só disponível nesse escopo
        // agora \/ altera \/ os elementos individualmente, quando clicado, pegará o att data-key, e irá alterar conforme cada posição da map.array
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerText = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        c('.pizzaBig img').src = pizzaJson[key].img;
        ca('.pizzaInfo--size').forEach((size, sizeIndex)=>{ //1par > recebe o proprio item(pizzaInfo--size), no caso o tamanho da pizza ;; 2par o valor de cada objeto no forEach;; 0, 1, 2
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; // acesso ao pizzajson[key] (cada pizza individualmente) ; acesso ao sizes(dentro da array) ;; quero o sizeIndex de cada objeto
        })
    
        c('.pizzaInfo--qt').innerHTML = modalQt;


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea ').style.opacity = 1; 
        }, 200); // fez a transition de opacity ;; já tinha a transition no CSS
    
    })


    c('.pizza-area').append(pizzaItem)
})

// EVENTOS DO MODAL

function closeM() {
    c('.pizzaWindowArea').style.opacity = 0;
        
        setTimeout(() => {
            c('.pizzaWindowArea').style.display = 'none';
        }, 500);
        
};
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt>1){
        modalQt = modalQt - 1
        c('.pizzaInfo--qt').innerHTML = modalQt
    } else if (modalQt=1) {
        modalQt = 1
        c('.pizzaInfo--qt').innerHTML = modalQt
    }
})
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt ++;
    c('.pizzaInfo--qt').innerHTML = modalQt
})

ca('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', ()=>{
       c('.pizzaInfo--size.selected').classList.remove('selected');
       size.classList.add('selected');
        
    })
}) // essa função faz com que deixe de selecionar um elemento e selecione outro, nos tamanhos da pizza  

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //essa função fará com que envie ao carrinho as informações da pizza, então deve-se reunir todas as informações da prizza que será enviada
    // qual a pizza, o tamanho e quantas pizza serão selecionadas
    let size = c('.pizzaInfo--size.selected').getAttribute('data-key')
    let identifier = `${pizzaJson[modalKey].id}@${size}` // cria um identificador com uma string para quando selecionado, armazenar o tamanho e a pizza
    let iKey = cart.findIndex((item)=>item.identifier = identifier);
    if (iKey > -1) {
        cart[iKey].qt += modalQt
    } else {
    cart.push({
        id: pizzaJson[modalKey].id,
        size: size,
        qt: modalQt
    })}
    closeM()
})  // declarou uma variavel para saber qual pizza era(modalKey), *quando clica na pizza*, size a variavel que guarda o tamanho, e por fim o modalQt guarda a quantidade das pizzas



if (iKey > -1) {
    cart[iKey].qt += modalQt
} else {
    cart.push
}



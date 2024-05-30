const cards =document.querySelector('.cards')
const btns=document.querySelectorAll('button')
const ranndomBtn=document.getElementById('random')

const _url ='https://www.themealdb.com/api/json/v1/1/search.php?f=';
const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const UrlId='https://www.themealdb.com/api/json/v1/1/lookup.php?i=';


  function meal(letter){
    fetch(_url+letter)
    .then(res =>res.json())
    .then(data =>{
        console.log(data)
        if (data.meals == null) {
          cards.innerHTML='<h2 style"color:yellow">Meal is not found</h2>'
        }else{
           names(data.meals)
        }
      } )
}
meal('a')

function getMealById(id){
  console.log(id);
  fetch(UrlId+id)
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data.meals[0]);
    const meal=data.meals[0]
    let ingrs=[]
    for(let i=1; i<21; i++){
      if(meal[`strIngredient${[i]}`]){
        ingrs.push(meal[`strIngredient${[i]}`])
      }
    }
    console.log(ingrs);
    showDetailMeal(data.meals[0]);
  });
}
function names(atar){
  cards.innerHTML=""
    for (const name of atar) {
         cards.innerHTML+=`
         <div class="card mt-3" style="width: 18rem;" onclick="getMealById(${name.idMeal})">
         <img src="${name.strMealThumb}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${name.strMeal}</h5>
         </div>
       </div>
         `

    }
}
btns.forEach(btn=>{
  btn.onclick=()=>{
    meal(btn.innerText.toLocaleLowerCase()) 
  }
})

ranndomBtn.onclick=()=>{
  fetch(randomUrl)
  .then((res) => res.json())
  .then((data) => names(data.meals))
}

function showDetailMeal(obj, arrIngrs){
  const liElement=arrIngrs.map((el)=>`
  <li>
    <h4>${el}</h4>
    <img src='www.themealdb.com/images/ingredients/${el}-Small.png'/>
  </li>`);

  cards.innerHTML=`
  <div class='detail'>
    <div class='detail-card'>
     <div>
        <h2>${obj.strMeal}</h2>
        <img src=${obj.strMealThumb}/>
     </div>
     <div>
         <h2>Ingredients</h2>
         <ul>
           ${liElement}
         </ul>
     </div>
  </div>
  <h2>Instructions</h2>
    <p>${obj.strInstructions}</p>
  </div>
  <div>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/hFP3qh1x1Zo?si=uyrFz737zKMk2ddy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  `
}


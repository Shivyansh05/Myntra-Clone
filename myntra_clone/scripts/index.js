let bag;
onload();
function onload(){ 
  let bagstr = localStorage.getItem('bag');
  bag = bagstr? JSON.parse(bagstr): [];
displayy();
displaybagcount();
}
function addtobag(itemid){
  bag.push(itemid);
  /*refresh krne pr sab gayab na ho isiliye local storage use krte h*/
  localStorage.setItem('bag',JSON.stringify(bag));
  displaybagcount();
}
function displaybagcount(){
  let b = document.querySelector('.bag-items-n');
  if(bag.length>0){
  b.innerText = bag.length;
  b.style.visibility = 'visible';
  }
  else
  b.style.visibility = 'hidden';
}
function displayy(){
let itemscontainerelement = document.querySelector('.items-container');
if(!itemscontainerelement)
return;
let inner = '';
items.forEach(item =>{
  inner += `
   <div class="item-container">
  <img class="imgg" src="${item.image}" alt="picture" >         
  <div class="rating">
  ${item.rating.stars}⭐ | ${item.rating.count}
  </div>
  <div class="name-item">
  ${item.item_name}
  </div>
  <div class="price">
  <span class="pricee" > ₹ ${item.current_price}</span>
  <span class="original-price">
  ₹ ${item.original_price}
  </span>
  <span class="discount">
  (${item.discount_percentage} % OFF)
  </span>
  </div>
  <div class="add-bag">
  <button class="add-button" onclick="addtobag(${item.id});">ADD TO BAG</button>
  </div>
  </div>
  `;
})
itemscontainerelement.innerHTML = inner;
}

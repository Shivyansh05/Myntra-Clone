let bagi;
let sum;
let disc;
let amount ;
let fee;
onload();
function onload(){
  loadbagitems();
  displaybagitems();
  loadsummary();
  displaysummary();
}
function loadsummary(){
  sum=0;
  fee=0;
  disc=0;
  amount=0;
 for(let i=0;i<bagi.length;i++){
   sum += bagi[i].original_price;
 }
 sum = Math.round(sum);
 let k;
 for(i=0;i<bagi.length;i++){
 k =  bagi[i].discount_percentage;
 disc +=(k/100)*(bagi[i].original_price);
 }
 disc = Math.round(disc);
amount = sum-disc;
if(bagi.length===0)
  fee=0;
else
fee = 99;
}
function loadbagitems(){
bagi = bag.map(itemid =>{
  for(let i=0;i<items.length;i++){
    if(itemid == items[i].id)
    return items[i];
  }
});
}
function displaybagitems(){
  let container = document.querySelector('.bag-items-container');
  let inner='';
  bagi.forEach(bagitem => {
    inner += generateitemhtml(bagitem);
  });
  container.innerHTML = inner ;
}
function remove(item){
  bag = bag.filter((num) =>{
    return num !== item;
  });
  localStorage.setItem('bag',JSON.stringify(bag));
  loadbagitems();
  loadsummary();
  displaysummary();
  displaybagitems();

}
function generateitemhtml(item){
let i = ` <div class="bag-item-container">
<div class="item-left-part">
  <img class="bag-item-img" src="../${item.image}">
</div>
<div class="item-right-part">
  <div class="company">${item.company}</div>
  <div class="item-name"> ${item.item_name}</div>
    <span class="current-price">${item.current_price}</span>
    <span class="original-price">${item.original_price}</span>
    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
  </div>
  <div class="return-period">
    <span class="return-period-days">${item.return_period}</span> return available
  </div>
  <div class="delivery-details">
    Delivery by
    <span class="delivery-details-days">${item.delivery_date}</span>
  </div>
<div class="remove-from-cart" onclick="remove(${item.id});">X</div>
</div>
`;
return i;
}
function displaysummary(){
  let summary = document.querySelector('.bag-details-container');
    let inner=  `
    <div class="price-header">PRICE DETAILS (${bagi.length} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">${sum}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-${disc}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs ${fee}</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">total amount</span>
      <span class="price-item-value">Rs ${amount}</span>
    </div>
  </div>
  <button class="btn-place-order"> PLACE ORDER </button>`;
    summary.innerHTML = inner;
    loadsummary();
}
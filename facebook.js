let title= document.getElementById('title')
let sold= document.getElementById('sold it by')
let price= document.getElementById('price')
let taxes= document.getElementById('taxes')
let ads= document.getElementById('ads')
let discount= document.getElementById('discount')
let total= document.getElementById('total')
let count= document.getElementById('count')
let category= document.getElementById('category')
let submit= document.getElementById('submit')

let mood = 'create'
let tmp;

//get total
function getTotal()
{
 if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;

 total.innerHTML = result;
 total.style.background = '#040';
}
else{
    total.innerHTML = '';
 total.style.background = 'rgb(184, 12, 0)';

}
}

//creat product
//save localstorge
let datapro;
if(localStorage.product != null){
    datapro =JSON.parse(localStorage.product)
}
else{
    datapro = []
}

submit.onclick = function(){
    let newpro = {
        sold:sold.value,
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        
    }
    //count
    if( mood == 'create')
    if(newpro.count > 1)
{
    for(let i = 0; i < newpro.count;i++){
        datapro.push(newpro);
    }    
}
else{
      datapro.push(newpro);
}
else{
    datapro[  tmp  ] =newpro;
    mood = 'create'
    submit.innerHTML = 'creat'
    count.style.display = 'block'
    
}


    localStorage.setItem('product', JSON.stringify(datapro))
   console.log(datapro)
    clearData()
    readData()
}


//clear inputs
function clearData()
{
    sold.value = '';
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    }

    //read
    function readData(){
        getTotal()
let table = '';
for(let i = 0; i < datapro.length; i++)
table += `
<tr>
<td>${i}</td>
<td>${datapro[i].sold}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick = "updatedata(${i})" id="update">update <i class="far fa-edit"></i></button></td>
<td><button onclick ="deleteData(${i})"  id="delete">Delete <i class="far fa-trash-alt"></i></button></td>
</tr>
`
document.getElementById('tbody').innerHTML = table
let btndelete = document.getElementById('deleteall')
if(datapro.length > 0)
{
    btndelete.innerHTML = `
    <button onclick='deleteall()'>delete All (${datapro.length}) <i class="far fa-trash-alt"></i></button></button>
    `
}
else{
    btndelete.innerHTML = '';
}
}
readData()
//delete
function deleteData(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
readData()
}
function deleteall(){
    localStorage.clear();
    datapro.splice(0)
    readData()
}

//update
function updatedata(i){
    sold.value = datapro[i].sold
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
 getTotal()
 count.style.display = 'none'
  category.value = datapro[i].category;
submit.innerHTML = 'update'
mood = 'update'
tmp = i
scroll({
    top:0,
    behavior:"smooth"
})
}
//search
let searchmood =  'title';

function getsearchmood(id){
    let search = document.getElementById('search')
if(id == 'searchTitle'){
    searchmood = 'title';
}
else{
    searchmood = 'category';
}
search.placeholder = 'Search by '+ searchmood
search.focus()
search.value = '',
readData()
}
function searchdata(value){
    let table =""
    for(let i = 0; i < datapro.length;i++){
if( searchmood == 'title'){

    if(datapro[i].title.includes(value.toLowerCase())){
        table += `
<tr>
<td>${i}</td>
<td>${datapro[i].sold}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick = "updatedata(${i})" id="update">update</button></td>
<td><button onclick ="deleteData(${i})"  id="delete">delete</button></td>
</tr>
`
    }
}

else{
        if(datapro[i].category.includes(value.toLowerCase())){
            table += `
    <tr>
    <td>${i}</td>
<td>${datapro[i].sold}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick = "updatedata(${i})" id="update">update</button></td>
    <td><button onclick ="deleteData(${i})"  id="delete">delete</button></td>
    </tr>
    `
        }
    }
}   
}
document.getElementById("tbody").innerHTML = table;

//clean data

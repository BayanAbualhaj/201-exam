'use strict';


/////////////////////////////////
///////// Global variable////////
/////////////////////////////////

var table =document.getElementById("wish-table");
var form =document.getElementById("form");
var paraTotal=document.getElementById("Total");

var arrayOfwishlist=[];
var arrayOfheader=['Name','Category','Quantity','Price','Total'];
var deleteX ;



////////////////////////////////////////
/////////function & event lister////////
///////////////////////////////////////

function Wishlist(name,category,quantity) {

    this.name=name;
    this.category=category;
    this.quantity=quantity;
    this.price=generateRandumNum();
    this.total=this.price*this.quantity;

    arrayOfwishlist.push(this);
    
}

Wishlist.prototype.renderItem = function () {
    var dataRow = document.createElement('tr');

    var nameData = document.createElement('td');
    nameData.textContent= this.name;
    dataRow.appendChild(nameData);

    var catData=document.createElement('td');
    catData.textContent=this.category;
    dataRow.appendChild(catData);

    var quantData= document.createElement('td');
    quantData.textContent=this.quantity;
    dataRow.appendChild(quantData);

    var priceData= document.createElement('td');
    priceData.textContent=this.price;
    dataRow.appendChild(priceData);

    var totalData= document.createElement('td');
    totalData.textContent=this.total;
    dataRow.appendChild(totalData);

    deleteX= document.createElement('button');
    deleteX.textContent='X';
    dataRow.appendChild(deleteX);
    deleteX.addEventListener('click',deleteButton);

    table.appendChild(dataRow);
}


function generateRandumNum() {
    return Math.floor(Math.random()*(1000-500)+500);
}

function wishlistData(event) {
    event.preventDefault();

    var name=event.target.itemName.value;
    var category=event.target.category.value;
    var quantity=event.target.quantity.value;
    //console.log(`name. ${name}  category ${category} quantity ${quantity}`);

    var newItem= new Wishlist(name,category,quantity);

    newItem.renderItem();
    

    localStorage.setItem('wishlist',JSON.stringify(arrayOfwishlist));
    total();
}


function total(){
    var totalPrice=0;

    for (let index = 0; index < arrayOfwishlist.length; index++) {
        totalPrice=totalPrice+arrayOfwishlist[index].total;
    }

    console.log(totalPrice);
    paraTotal.textContent=`Total Price= ${totalPrice}`;
  
}


function tableHeader() {
    var tablerow= document.createElement('tr');
    for (let index = 0; index < arrayOfheader.length; index++) {
        var tablehead= document.createElement('th');
        tablehead.textContent=arrayOfheader[index];
        tablerow.appendChild(tablehead);
        
    }
    table.appendChild(tablerow);
}

function deleteButton(event) {
    event.target.parentElement.remove();
    var name =event.target.parentElement.innerHTML.split('<td>',2);
    name=name[1].replace('</td>', "");
    for (let index = 0; index < arrayOfwishlist.length; index++) {
        if (name == arrayOfwishlist[index].name) {
            var j = arrayOfwishlist.indexOf(arrayOfwishlist[index]);
            arrayOfwishlist.splice(j,1);
        }
        
    }
    localStorage.setItem('wishlist',JSON.stringify(arrayOfwishlist));
    total();
}

function checkLS() {
    if (localStorage.getItem('wishlist')) {
        arrayOfwishlist= JSON.parse(localStorage.getItem('wishlist'));
        //console.log(arrayOfwishlist);
        for (let index = 0; index < arrayOfwishlist.length; index++) {
            
            var dataRow = document.createElement('tr');

            var nameData = document.createElement('td');
            nameData.textContent= arrayOfwishlist[index].name;
            dataRow.appendChild(nameData);

            var catData=document.createElement('td');
            catData.textContent=arrayOfwishlist[index].category;
            dataRow.appendChild(catData);

            var quantData= document.createElement('td');
            quantData.textContent=arrayOfwishlist[index].quantity;
            dataRow.appendChild(quantData);

            var priceData= document.createElement('td');
            priceData.textContent=arrayOfwishlist[index].price;
            dataRow.appendChild(priceData);

            var totalData= document.createElement('td');
            totalData.textContent=arrayOfwishlist[index].total;
            dataRow.appendChild(totalData);

            deleteX= document.createElement('button');
            deleteX.textContent='X';
            dataRow.appendChild(deleteX);
            deleteX.addEventListener('click',deleteButton);

            table.appendChild(dataRow);
        }
        total();
    }
}


form.addEventListener('submit',wishlistData);
tableHeader();
checkLS();


let title = document.getElementById("title");
let salery = document.getElementById("salery");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit = document.getElementById("create");

let mood = 'create';
let tmp;

// get total
function getTotal()
{
    if(salery.value != ''){
        let result = (+salery.value + +tax.value + +ads.value - +discount.value);

        total.innerHTML = result;
        total.style.background = "#07ca3b";
    } else {
        total.innerHTML = '';
        total.style.background = "#f04";
    }
}

// Create total
let addData;
if(localStorage.product != null){
    addData = JSON.parse(localStorage.product);
}else{
    addData = [];
}

// console.log(addData)
submit.onclick = function(){
    let newPro = {
        title:title.value,
        salery:salery.value,
        tax:tax.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
    }

    if(total.innerHTML == ''){
        alert('Empty Total')
    }else{
        if(mood === 'create'){
            addData.push(newPro);
            
        }else{
            addData[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = "Create Pruduct";
        }
        
        localStorage.setItem('product', JSON.stringify(addData));
        clearD();
    }
    
    showD();
}

// Clear Pro
function clearD()
{
    title.value = '';
    salery.value = '';
    tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
}

// Show Data
function showD()
{
    let table = '';
    for(let i = 0; i < addData.length; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${addData[i].title}</td>
                <td>${addData[i].salery}</td>
                <td>${addData[i].tax}</td>
                <td>${addData[i].ads}</td>
                <td>${addData[i].discount}</td>
                <td>${addData[i].total}</td>
                <td>
                    <button onclick="delData(${i})">Delete</button>
                    <button onclick="updData(${i})">Update</button>
                </td>
            </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
}
showD();

// Update
function updData(i){
    title.value = addData[i].title;
    salery.value = addData[i].salery;
    tax.value = addData[i].tax;
    ads.value = addData[i].ads;
    discount.value = addData[i].discount;
    getTotal();
    submit.innerHTML = "Update";
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// Delete
function delData(i){
    if(confirm('Are You Sure ?')){
      
        addData.splice(i, 1);
        localStorage.product = JSON.stringify(addData);
        showD();
        
    }
}

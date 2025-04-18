const productTitle = document.getElementById('Titleinput');
const price = document.getElementById('price');
const ads = document.getElementById('ads');
const texes = document.getElementById('texes');
const discound = document.getElementById('discound');
const total = document.getElementById('total');
const submit = document.getElementById('submit');
const category = document.getElementById('category');
const count = document.getElementById('count');

let Create_To_Update_Mood = 'create';
let i_value;
// get total
function getTotal() {
    if(price.value != '') {
        let TOTAl = (+price.value + +ads.value + +texes.value) - +discound.value
        total.innerHTML = TOTAl
        total.style.color = "rgb(231, 67, 67)"
        total.style.boxShadow = '0 0 8px rgb(247, 77, 77)'
    }  
    else {
        total.innerHTML = ''
        total.style.color = "#4db8ff"
        total.style.boxShadow = '0 0 8px #4db3f7'
    }
}

 // create products all
let dataArray

if (localStorage.SavePrudactsInLocalStorge != null) {
    dataArray = JSON.parse(localStorage.SavePrudactsInLocalStorge)
}
else{
    dataArray = []
}
submit.addEventListener('click', ()=> {
    let products = {
        title: productTitle.value,
        price: price.value,
        ads: ads.value,
        texes: texes.value,
        discound: discound.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }
    // don't allow createing elment without buting the this.inputs
    // if stetment for Enter product name
    if(productTitle.value.trim() === '') {
        productTitle.placeholder = 'Please type the product name'
        productTitle.style.boxShadow = '0 0 8px rgb(247, 77, 77)'

    } else {
        productTitle.placeholder = 'Enter product name'
        productTitle.style.boxShadow = 'none'

    }
    // if statement for entering the product price
    if(price.value.trim() === '') {
        price.placeholder = 'Please type the pice'
        price.style.boxShadow = '0 0 8px rgb(247, 77, 77)'

    } else {
        price.placeholder = 'Enter product name'

    }
    // if statement for entering the categorey
    if(category.value.trim() === '') {
        category.placeholder = 'Please type the category'
        category.style.boxShadow = '0 0 8px rgb(247, 77, 77)'

    } else {
        category.placeholder = 'Enter product name'

    }
    // if statement for entering the count
    if(count.value > 100) {
        count.placeholder = 'Please type the count less than 100'
        count.style.boxShadow = '0 0 8px rgb(247, 77, 77)'


    }
    else{
        count.placeholder = 'count'

    }
    
    if(productTitle.value != '' 
        && price.value != ''
        && category.value != ''
        && products.count < 100) {
        // if moode is create not update
        if (Create_To_Update_Mood === 'create') {
            if (products.count > 1) {
                // loop for count 
                for (let i = 0; i < products.count; i++) {
                    dataArray.push(products)
                }
            } 
            else {
            dataArray.push(products)
        }
    } else {
        // update methode
        dataArray[i_value] = products
        Create_To_Update_Mood = 'create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }
    clearInputs()
    }

    
    localStorage.setItem('SavePrudactsInLocalStorge', JSON.stringify(dataArray))
    
    getTotal()
    readData()
})
 // save data localstorge
 // remove input clear input
 function clearInputs() {
    productTitle.value = ''
    price.value = ''
    ads.value = ''
    texes.value = ''
    discound.value = ''
    total.innerHTML = ''
    category.value = ''
    count.value = ''

 } 
 // Read 
 function readData() {
    getTotal()
    let table = ''
    for(let i = 0; i < dataArray.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td> <!-- This is to show the index number (starting from 1) -->
                <td>${dataArray[i].title}</td>
                <td>${dataArray[i].price}</td>
                <td>${dataArray[i].ads}</td>
                <td>${dataArray[i].texes}</td>
                <td>${dataArray[i].discound}</td>
                <td>${dataArray[i].total}</td>
                <td>${dataArray[i].category}</td>   
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table

    let btn = document.getElementById('deleteAll')
    if(dataArray.length > 0) {
        btn.innerHTML = `
        <button onclick="DeleteAll()">Delete All(${dataArray.length})</button>`
    }
    else{
        btn.innerHTML = ''
    }
}
 readData() 
 // delete
 function DeleteData(i) {
    dataArray.splice(i, 1)
    localStorage.SavePrudactsInLocalStorge = JSON.stringify(dataArray)
    readData()
 }
 function DeleteAll() {
    localStorage.clear()
    dataArray.splice(0)
    readData()
}
 // count
 // update
 function updateData(i) {
    productTitle.value = dataArray[i].title
    price.value = dataArray[i].price
    ads.value = dataArray[i].ads
    texes.value = dataArray[i].texes
    discound.value = dataArray[i].discound
    getTotal()
    count.style.display = 'none'
    category.value = dataArray[i].category
    submit.innerHTML = 'Update'
    Create_To_Update_Mood = 'update'
    i_value = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
 }
 // search
let searchMood = 'title'

 function getidSearch(id) {
    let Search = document.getElementById('search')

    if(id === 'SearchByTitle') {
        searchMood = "title"
    }
    else {
        searchMood = 'category'
    }
    Search.placeholder = 'Search By ' + searchMood
    Search.focus()
    Search.value = ''
    
 }
 function getSearchResult(value) {
    let table = ''
    if(searchMood === 'title') {
        for(let i = 0; i < dataArray.length; i++) {
            if(dataArray[i].title.includes(value)) {
                    table += `
                    <tr>
                        <td>${i + 1}</td> <!-- This is to show the index number (starting from 1) -->
                        <td>${dataArray[i].title}</td>
                        <td>${dataArray[i].price}</td>
                        <td>${dataArray[i].ads}</td>
                        <td>${dataArray[i].texes}</td>
                        <td>${dataArray[i].discound}</td>
                        <td>${dataArray[i].total}</td>
                        <td>${dataArray[i].category}</td>   
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    else {
            for(let i = 0; i < dataArray.length; i++) {
                if(dataArray[i].category.includes(value.tolowerCase())) {
                        table += `
                        <tr>
                            <td>${i + 1}</td> <!-- This is to show the index number (starting from 1) -->
                            <td>${dataArray[i].title}</td>
                            <td>${dataArray[i].price}</td>
                            <td>${dataArray[i].ads}</td>
                            <td>${dataArray[i].texes}</td>
                            <td>${dataArray[i].discound}</td>
                            <td>${dataArray[i].total}</td>
                            <td>${dataArray[i].category}</td>   
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
                        </tr>
                    `
                }
            }
        }
        document.getElementById('tbody').innerHTML = table
    }
    
 // clean data
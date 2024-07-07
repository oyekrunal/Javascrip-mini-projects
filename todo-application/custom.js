const addUser = document.querySelector('#addUser');
const userInput = document.querySelector('#userInput');
const addUserText = addUser.innerText;
const records = document.querySelector('#records');
const select = document.querySelector('#select');

let dataArray = []
let edit_id = null;

let getData = JSON.parse(localStorage.getItem('data'))
dataArray = getData || []

updateData(dataArray)

addUser.addEventListener('click', function(e) {
    if(userInput.value !== '') {
        let userData = userInput.value;
        if(edit_id !== null) {
            dataArray.splice(edit_id, 1, {'name' : userData});
            edit_id = null;
            addUser.innerText  = addUserText;
        } else {
            dataArray.push({'name' : userData});
        }
        saveData(dataArray)
        userInput.value = '';
    } else {
        alert('Input is empty, please enter a username.')
    }
})

function saveData(data) {
    let setdata = JSON.stringify(data)
    localStorage.setItem('data', setdata)
    updateData(data)
}

function updateData(data) {
    let updateUserTable = ''
    data.forEach((data, i) => {
        updateUserTable += `
         <tr>
            <th scope="row">${i + 1}</th>
            <td>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</td>
            <td>
            <i class="fa-regular fa-pen-to-square btn btn-secondary mx-1" onclick="editData(${i})"></i>
            <i class="fa-regular fa-trash-can btn btn-danger mx-1" onclick="deleteData(${i})"></i>
            </td>
        </tr>`
    });
    records.innerHTML = updateUserTable;
}

function editData(id) {
    edit_id = id;
    userInput.value = dataArray[id].name
    addUser.innerText = 'UPDATE USER'

}

function deleteData(id) {
    dataArray.splice(id, 1)
    saveData(dataArray)
}


// Search Filter
const allTr = records.querySelectorAll('tr')
const search = document.querySelector('#search')
const pagination = document.querySelector('#pagination')

search.addEventListener('input', function(e) {
    let target = e.target.value;
    records.innerHTML = ''
    allTr.forEach(tr => {
        const dataName = tr.querySelectorAll('td')
        if(dataName[0].innerText.toLowerCase().indexOf(target) > -1) {
            records.appendChild(tr)
        }

    })

    if(records.innerHTML == '') {
        records.innerHTML = '<div class="mt-2">No user found :(</div>'
    }
})

// Pagination
let records_per_page = 5;
let page_number = 1;
const total_records  = allTr.length;
let total_page = Math.ceil(total_records / records_per_page)
generatePage()
displayRecords() 
function displayRecords() {
    let start_index = (page_number - 1) * records_per_page;
    let end_index = start_index + (records_per_page - 1);

    if(end_index >= total_records) {
        end_index = total_records - 1
    }

    let statement = '';
    for(let i = start_index; i <= end_index; i++) {
        statement += `<tr>${allTr[i].innerHTML}</tr>`
    }
    records.innerHTML = statement;

    // Pagination JS
    document.querySelectorAll('.dynamic-btn').forEach(item => {
        item.classList.remove('active')
    })
    
    document.getElementById(`page-${page_number}`).classList.add('active')

    document.querySelector('#info').innerHTML = `Showing ${start_index + 1} to ${end_index + 1} of ${total_records}`
    console.log(document.querySelector('#info'))
    if(page_number === 1) {
        document.querySelector('#prevBtn').classList.add('disabled')
    } else {
        document.querySelector('#prevBtn').classList.remove('disabled')
    }
    if(page_number === total_page) {
        document.querySelector('#nextBtn').classList.add('disabled')
    } else {
        document.querySelector('#nextBtn').classList.remove('disabled')
    }
}

function generatePage() {
    let prevBtn = `
        <li class="page-item" id="prevBtn">
            <a onclick="prevBtn()" class="page-link" href="javascript:void(0)">Previous</a>
        </li>`
    let nextBtn = `
        <li class="page-item" id="nextBtn">
            <a onclick="nextBtn()" class="page-link" href="javascript:void(0)">Next</a>
        </li>`
    let button = ''
    let activeClass = '';
    for (let i = 1; i <= total_page; i++) {
        if(i === 1) {
            activeClass = 'active'
        } else {
            activeClass = ''
        }

        button += `<li id="page-${i}" class="page-item dynamic-btn ${activeClass}" ><a class="page-link"href="javascript:void(0)" onclick="page(${i})">${i}</a></li>`
    }
    
    pagination.innerHTML = `${prevBtn} ${button} ${nextBtn}` 

}

function prevBtn() {
    page_number--;
    displayRecords()
}
function nextBtn() {
    page_number++;
    displayRecords()
}

function page(id) {
    page_number = parseInt(id)
    displayRecords()
}

select.addEventListener('change', function(e) {
    let target = e.target.value
    records_per_page = target
    page_number = 1;
    total_page = Math.ceil(total_records / records_per_page)
    generatePage()
    displayRecords() 
})


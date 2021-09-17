
const submitButton = document.getElementById("btn");
const updateButton = document.getElementById("upbtn");
updateButton.style.display = "none"
var dataarr = []
var localData = JSON.parse(localStorage.getItem("dataarr"));
var bvalidation=false

 function validation(e){
    submitButton.disabled = false;
        console.log(e.value)
        if(bvalidation){
        if(e.value.length>1){
            submitButton.style.display='block'
        }
 }

 }
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    var name = document.getElementById('inputfield1').value;
    var department = document.getElementById('inputfield2').value;
    var phoneno = document.getElementById('inputfield3').value;
    inserData(name, department, phoneno)
    submitButton.disabled = true;
  readData()
  bvalidation=true

   
})
submitButton.disabled = false;
const resetForm = () => {
    document.getElementById('inputfield1').value = '';
    document.getElementById('inputfield2').value = '';
    document.getElementById('inputfield3').value = '';
}
function inserData(name, department, phoneno) {
    var obj = {
        name: name,
        department: department,
        phoneno: phoneno
    }
    if (localData) {
        localData.push(obj)
        localStorage.setItem('dataarr', JSON.stringify(localData))
        resetForm()
    }
    else {
        dataarr.push(obj)
        localStorage.setItem('dataarr', JSON.stringify(dataarr))
        resetForm()
    }

}
readData()

function readData() {
    var Tbody = document.getElementById("tbody");
    var row = ""
    localData.map((data, index) => {
        row += `<tr>
     <td>${data.name}</td>
    <td>${data.department}</td>
    <td>${data.phoneno}</td>
    <td> <a class="editbtn" onclick="update(${index})">edit </a></td>
    <td> <a class="deletbtn" onclick="deletes(${index})">delete </a></td> 
 </tr>`
    })
    Tbody.innerHTML = row;
}

var okdata
function update(i) {
    okdata = i;
    document.getElementById('inputfield1').value = localData[i].name;
    document.getElementById('inputfield2').value = localData[i].department;
    document.getElementById('inputfield3').value = localData[i].phoneno;
    updateButton.style.display = "block";
    submitButton.style.display="none"
    bvalidation=false
}
updateButton.addEventListener("click", (e) => {
    e.preventDefault()
    localData[okdata].name = document.getElementById('inputfield1').value;
    localData[okdata].department = document.getElementById('inputfield2').value;
    localData[okdata].phoneno = document.getElementById('inputfield3').value;
    readData()
    localStorage.setItem('dataarr', JSON.stringify(localData))
    resetForm();
    submitButton.disabled = false;
    submitButton.style.display="block";
    updateButton.style.display = "none";
    
    
})
function deletes(i) {
     localData.splice(i, 1)
    localStorage.setItem('dataarr', JSON.stringify(localData))
    readData()
}

const search = (e) => {
    var searchvalue = (e.value).toUpperCase();
    var rowData = document.querySelectorAll("#tbody tr")
    for (var i = 0; i < rowData.length; i++) {
        var nametd = rowData[i].getElementsByTagName('td')[0]
        if (nametd) {
            var txtValue = nametd.textContent || nametd.innerText;
            if (txtValue.toUpperCase().indexOf(searchvalue) > -1) {
                rowData[i].style.display = "";
            } else {
                rowData[i].style.display = "none";
            }
        }
    }
}
let shortToggle = true;
const short = () => {
    shortToggle = !shortToggle
    var rows, shorting, x, y, shouldSwitch;
    var table = document.getElementById("table");
    shorting = true
    while (shorting) {
        shorting = false;
        rows = table.rows;
        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            if (shortToggle) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (!shortToggle) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            shorting = true;
        }
    }
}
      submitButton.style.display='block';
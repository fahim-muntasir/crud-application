const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
document.addEventListener('DOMContentLoaded', () => {
    
    fetch(`http://localhost:3000/api/user/?id=${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('inputName').value = data.name;
        document.getElementById('inputEmail').value =data.email;
        fetch('http://bdapis.herokuapp.com/api/v1.1/districts')
        .then(response => response.json())
        .then((item) => {
            const elements = item.data;
            let allDistrict = '';
            elements.map((elements) => {
                let selected = ''
                if (elements.district === data.address) {
                    selected = 'selected';
                }else{
                    selected = '';
                }

                allDistrict += `<option value="${elements.district}" ${selected}>${elements.district}</option>` ;
            })
            document.getElementById('address_select').innerHTML =allDistrict;
        });
        if (data.role == 'admin') {
            document.getElementById('role_admin').checked = 'checked';
        } else if(data.role == 'user'){
            document.getElementById('role_user').checked = 'checked';
        }
    });
})


document.getElementById('submit_btn').addEventListener('click', (e) =>{
    e.preventDefault();
    const username = document.getElementById('inputName').value;
    const useremail = document.getElementById('inputEmail').value;
    const useraddress = document.getElementById('address_select').value;
    let role_admin = document.getElementById('role_admin');
    let role_user = document.getElementById('role_user');
    let userrole = '';
    if (role_admin.checked == true) {
        userrole = 'admin';
    } else if(role_user.checked == true){
        userrole = 'user';
    }

    const userInfo = {
        name: username,
        email: useremail,
        address: useraddress,
        role: userrole
    }

    const url = `http://localhost:3000/api/user/${id}`;
    const requestData = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    }
    fetch(url, requestData)
    .then(response => response.json())
    .then(data => {
        Toastify({
            text: data.message,
            duration: 4000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
        //document.getElementById('add_usr_form').reset();
    });
})
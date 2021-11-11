document.getElementById('submit_btn').addEventListener('click',(e) => {
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

    const url = 'http://localhost:3000/api/user';
    const requestData = {
        method: 'POST',
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
        document.getElementById('add_usr_form').reset();
    });
})
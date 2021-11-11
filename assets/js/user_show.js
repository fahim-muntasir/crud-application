document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/user')
    .then(response => response.json())
    .then(user => {
        let allUser = '';
        let sNO = 1;
        user.map(singleUser => {
            allUser += `<tr>
            <th scope="row">${sNO}</th>
            <td>${singleUser.name}</td>
            <td>${singleUser.email}</td>
            <td>${singleUser.address}</td>
            <td>${singleUser.role}</td>
            <td>
              <a href="/update_user?id=${singleUser._id}" class="text-dark"
                ><i class="fal fa-edit"></i
              ></a>
            </td>
            <td>
              <a data-id="${singleUser._id}" id="delete_user" class="text-dark"
              ><i class="fal fa-times"></i></a>
            </td>
          </tr>`
          sNO++;
        })
        document.getElementById('allUserTable').innerHTML = allUser;
        deleteUser();
    });
    
})

// delete user function
function deleteUser(){
  document.querySelector('#delete_user').addEventListener('click', (e) =>{
    const id = document.querySelector('#delete_user').getAttribute('data-id');
    const url = `http://localhost:3000/api/user/${id}`;
    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
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
        
    });
  })
}
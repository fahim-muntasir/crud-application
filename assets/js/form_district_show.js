document.addEventListener('DOMContentLoaded', () =>{
    fetch('http://bdapis.herokuapp.com/api/v1.1/districts')
    .then(response => response.json())
    .then((item) => {
        const elements = item.data;
        let allDistrict = '<option disabled selected>Select your district</option>';
        elements.map((data) => {
            allDistrict += `<option data-id="${data.district}" value="${data.district}">${data.district}</option>` ;
        })
        document.getElementById('address_select').innerHTML =allDistrict;
    });
})
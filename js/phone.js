const loadPhone = async (searchText = 13, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)

    // step 1
    const phoneContainer = document.getElementById('phone-container');
    // clear before new
    phoneContainer.textContent = ' ';

    // display show all button if there are 12 phones
    const showAllcontainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllcontainer.classList.remove('hidden')
    }
    else{
        showAllcontainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll) 

    // display 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


    phones.forEach(phone => {
        // console.log(phone);

        // step 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        // step 3 inner html
        phoneCard.innerHTML = `<figure>
            <img
            src="${phone.image}"
            alt="" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}!</h2>
            <p></p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
            </div>
        </div>`

        // step 4 append child
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
    // console.log('clicked', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(data);
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}.</p>
    <p><span>chipSet:</span>${phone?.mainFeatures?.chipSet}.</p>
    <p><span>name:</span>${phone?.name}.</p>
    <p><span>releaseDate:</span>${phone?.releaseDate}.</p>
    <p><span>slug:</span>${phone?.slug}.</p>
    <p><span>memory:</span>${phone?.mainFeatures?.memory}.</p>
    <p><span>GPS:</span>${phone?.others?.GPS || 'no gps available'}.</p>
    `

    // show phone details
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

// handle search button
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     console.log(searchText);
//     loadPhone(searchText)
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner-loading');
    if(isLoading === true){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true)
}


loadPhone();
import axios from 'axios';

const userList = document.querySelector('#user-list');
const restaurantList = document.querySelector('#restaurant-list');
const reservationList = document.querySelector('#reservation-list');

let users;
const renderUsers = (users) => {
    const userId = window.location.hash.slice(1);
    const html = users.map(user=> `
    <li class='${user.id===userId ? 'selected' : ''}'>
        <a href='#${user.id}'>${user.name}</a>
    </li>`).join('');
    userList.innerHTML = html
};

const renderRestaurants = (rest) => {
    const html = rest.map(r=> `
    <li>
        ${r.name}
    </li>`).join('');
    restaurantList.innerHTML = html; 
};

const renderReservations = (reservations) => {
    const html = reservations.map(r=> `
    <li>
        ${r} @ 
    </li>`).join('');
    console.log(reservations)
    reservationList.innerHTML = html; 
};


const init = async () => {
    try {
        const userId = window.location.hash.slice(1);
        users = (await axios.get('/api/users')).data;
        const restaurants = (await axios.get('/api/restaurants')).data;
        renderUsers(users);
        renderRestaurants(restaurants);
        if (userId) {
            const url = `/api/users/${userId}/reservations`
            const reservations = (await axios.get(url)).data
            console.log(reservations)
        }
    } catch(err) {
        console.log(err)
    }
};

window.addEventListener('hashchange', async() => {
    const userId = window.location.hash.slice(1);
    const url = `/api/users/${userId}/reservations`;
    const reserves = (await axios.get(url)).data;
    renderReservations(reserves);
})

init();
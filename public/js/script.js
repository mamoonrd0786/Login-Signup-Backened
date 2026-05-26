const API_URL = 'http://localhost:4000/api/v1/users';

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const usersTableBody = document.getElementById("usersTableBody");


// Register User

if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value;
        const username = document.getElementById('username')?.value;
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        if (!name || !username || !email || !password) {
            alert('Credentials required')
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, email, password })
            })

            if (response.ok) {
                const inputs = this.querySelectorAll('input');
                inputs.forEach((input) => input.value = '');
                const paragraph = document.createElement('p');
                paragraph.className = 'message';
                paragraph.innerText = `${name} !! Registered successfully`;
                const newChlid = document.getElementById('newChild');
                newChlid.appendChild(paragraph);
                newChlid.style.animationDelay = '0.5s';

                setTimeout(() => {
                    newChlid.removeChild(paragraph);
                    setTimeout(() => {
                        window.location.href = 'login.html'
                    }, 2500);
                }, 3000);
            } else {
                alert(`Registeration failed: ${data.message || response.statusText}`)
            }

        } catch (error) {
            console.log(error);
            // alert('Something went wrong' || error.message)
        }
    })
}


//  Login User

if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        if (!email || !password) {
            alert('Credentials required')
            return;
        }
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })

            const data = await response.json();

            if (response.ok) {
                const createPara = document.createElement('p');
                createPara.className = 'message';
                createPara.innerText = 'Login successfull';
                const loginMessage = document.getElementById('loginMessage');
                loginMessage.appendChild(createPara);
                loginMessage.style.animationDelay = '0.5s'
                setTimeout(function () {
                    loginMessage.removeChild(createPara);
                    window.location.href = 'users.html'

                }, 2000)
            } else {
                alert(`Login failed: ${data.message || response.statusText}`)
            }

        } catch (error) {
            alert('Something went wrong in login page.' || error.message)
        }
    })
}


// Logut User

async function logoutUser() {
    try {
        const res = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json();
        console.log('Logout data', data);


        if (res.ok) {
            alert('Logout' || data.message);
            window.location.href = 'login.html'
        } else {
            alert(`Logout failed: ${data.message || res.statusText}`)
        }
    } catch (error) {
        alert('Something went wrong with logout page' || error.message)
    }
}


// Delete users

async function deleteUser() {

    try {
        const res = await fetch(`${API_URL}/delete-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json();
        if (!data.ok) {
            alert('User does not exist')
        }
        console.log(data);

    } catch (error) {

    }

}


// Add new user

// function addNewUser(name, email, id){

// }

// Fetch all users

// usersTableBody.addEventListener('load', function(){
//     try {
//         const data = fetch(`${API_URL}/all-users-data`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application.json'
//             },

//         });

//         const res = data.json();
//         console.log(res);


//     } catch (error) {
//         console.log('Error all users ', error);

//     }
// })

async function getAllUsers() {

    const usersData = document.querySelector('.usersData');
    try {
        const response = await fetch(`${API_URL}/all-users-data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ email, name  })

        })

        const data = await response.json();

        if (data.length === 0) {
            alert('User not present')
        }

        data.data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button class="btn btn-warning btn-sm" onclick="editUser" >Edit</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteUser()">Delete</button></td>
            <td><button class="btn btn-info btn-sm" onclick="viewUser" >View</button></td>
            `
            usersData.appendChild(tr);
        })

    } catch (error) {
        console.log('Error in fetch data ', error);

    }
}

getAllUsers();

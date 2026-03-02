const API_URL = 'http://localhost:4000/api/v1/users';

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username')?.value;
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;

        if (!username || !email || !password) {
            alert('Credentials required')
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json();
            if (response.ok) {
                const paragraph = document.createElement('p');
                paragraph.className = 'message';
                paragraph.innerText = `${username} !! Registered successfully`;
                const newChlid = document.getElementById('newChild');
                newChlid.appendChild(paragraph);
                paragraph.style.animationDelay = '0.5s'
                setTimeout(() => {
                    newChlid.removeChild(paragraph);
                    setTimeout(() => {
                        window.location.href = 'login.html'
                    }, 2000);
                }, 2000);
            } else {
                alert(`Registeration failed: ${data.message || response.statusText}`)
            }

        } catch (error) {
            // console.log(error);
            alert('Something went wrong' || error.message)
        }
    })
}


//  Login through email, username

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


// Logut the page

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
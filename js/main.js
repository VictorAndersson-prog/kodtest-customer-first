// Define the base URL for API requests
const BASE_URL = "https://reqres.in";

// Get the modal element
const modal = document.querySelector("#myModal");

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Fetch and display the list of users when the window loads
window.onload = async function () {
    try {
        const data = await fetchUsersData();

        data.forEach((user) => {
            const userDiv = createUserDiv(user);
            document.querySelector("#list").appendChild(userDiv);
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};

// Fetches the list of users from the API
async function fetchUsersData() {
    const res = await fetch(`${BASE_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseJson = await res.json();
    return responseJson.data;
}

// Creates a user div element and sets its content
function createUserDiv(user) {
    const { id, email, first_name, last_name, avatar } = user;

    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    userDiv.onclick = async function () {
        try {
            const userData = await fetchUserDetails(id);

            showUserDetailsModal(userData);
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    };

    const img = createUserImage(avatar);
    const p = createUserParagraph(`${first_name} ${last_name}`);
    const span = document.createElement("span");
    const arrow = createUserParagraph(">");
    arrow.classList.add("arrow");

    userDiv.appendChild(img);
    userDiv.appendChild(p);
    userDiv.appendChild(arrow);

    return userDiv;
}

// Fetches the user details from the API
async function fetchUserDetails(userId) {
    const userRes = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const userResponseJson = await userRes.json();
    return userResponseJson.data;
}

// Show the modal with user details
function showUserDetailsModal(userData) {
    modal.style.display = "flex";

    document.querySelector(
        "#name"
    ).textContent = `${userData.first_name} ${userData.last_name}`;
    document.querySelector("#email").textContent = userData.email;
    document.querySelector("#id").textContent = `Id: ${userData.id}`;
    document.querySelector("#img").src = userData.avatar;
    document.querySelector(
        "#img"
    ).alt = `${userData.first_name} ${userData.last_name}`;
}

// Creates an img element and sets its source
function createUserImage(avatar) {
    const img = document.createElement("img");
    img.src = avatar;
    return img;
}

// Creates a p element and sets its content
function createUserParagraph(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    return p;
}

// Define the base URL for API requests
const BASE_URL = "https://reqres.in";

// Get the modal element
const modal = document.querySelector("#myModal");

// Close the modal when the user clicks outside of it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Fetch and display the list of users when the window loads
window.onload = async function () {
    try {
        // Fetch the list of users from the API
        const res = await fetch(`${BASE_URL}/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Parse the response JSON and extract the data
        const data = (await res.json()).data;

        // Loop through the user data and create user elements
        data.forEach((user) => {
            const { id, email, first_name, last_name, avatar } = user;

            // Create a user div element
            const userDiv = document.createElement("div");
            userDiv.classList.add("user");

            // Add an onclick event listener to the user div
            userDiv.onclick = async function () {
                try {
                    // Fetch the user details from the API
                    const userRes = await fetch(`${BASE_URL}/api/users/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    // Parse the response JSON and extract the user data
                    const userData = (await userRes.json()).data;

                    // Show the modal
                    modal.style.display = "flex";

                    // Set the user details in the modal
                    document.querySelector(
                        "#name"
                    ).textContent = `${userData.first_name} ${userData.last_name}`;
                    document.querySelector("#email").textContent = email;
                    document.querySelector("#id").textContent = `Id: ${id}`;

                    // Change the image source in the modal
                    document.querySelector("#img").src = avatar;

                    //add alt tag to image
                    document.querySelector(
                        "#img"
                    ).alt = `${userData.first_name} ${userData.last_name}`;
                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                }
            };

            // Create an img element and set its source
            const img = document.createElement("img");
            img.src = avatar;

            // Append the img element to the user div
            userDiv.appendChild(img);

            // Create a p element and set its content
            const p = document.createElement("p");
            p.innerHTML = `${first_name} ${last_name}`;

            // Append the p element to the user div
            userDiv.appendChild(p);

            // Append the user div to the list container
            document.querySelector("#list").appendChild(userDiv);
        });
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
};

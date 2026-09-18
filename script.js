// Users data

const users = [
    {
        id: 1,
        name: "Monika",
        username: "@monika",
        bio: "Web developer | Technology lover",
        followers: 120,
        following: 80,
        posts: [
            "Learning JavaScript today!",
            "Building my first micro blogging website.",
            "I love web development ❤️"
        ]
    },

    {
        id: 2,
        name: "Priya",
        username: "@priya",
        bio: "UI/UX Designer 🎨",
        followers: 250,
        following: 150,
        posts: [
            "Design is not just about looks.",
            "Working on a new UI design!",
            "Learning Figma today."
        ]
    },

    {
        id: 3,
        name: "Rahul",
        username: "@rahul",
        bio: "Full Stack Developer 💻",
        followers: 320,
        following: 200,
        posts: [
            "Node.js is interesting!",
            "Started learning React.",
            "Building a full stack project."
        ]
    }
];


// Display users on Home Page

function displayUsers() {

    const userList = document.getElementById("userList");

    userList.innerHTML = "";

    users.forEach(user => {

        const firstLetter = user.name.charAt(0);

        userList.innerHTML += `

            <div class="user-card">

                <div class="profile-img">
                    ${firstLetter}
                </div>

                <div class="user-info">

                    <h3>${user.name}</h3>

                    <p>${user.username}</p>

                    <div class="stats">
                        ${user.followers} Followers |
                        ${user.following} Following |
                        ${user.posts.length} Posts
                    </div>

                </div>

                <button 
                    class="viewBtn"
                    onclick="showProfile(${user.id})">
                    View Profile
                </button>

            </div>

        `;
    });
}


// Show selected user's profile

function showProfile(id) {

    const user = users.find(u => u.id === id);

    document.getElementById("homePage").style.display = "none";
    document.getElementById("profilePage").style.display = "block";

    const profileDetails =
        document.getElementById("profileDetails");

    profileDetails.innerHTML = `

        <div class="profile-box">

            <div class="big-profile-img">
                ${user.name.charAt(0)}
            </div>

            <h2>${user.name}</h2>

            <p>${user.username}</p>

            <p class="bio">
                ${user.bio}
            </p>

            <div class="profile-stats">

                <div>
                    <strong>${user.followers}</strong>
                    <br>
                    Followers
                </div>

                <div>
                    <strong>${user.following}</strong>
                    <br>
                    Following
                </div>

                <div>
                    <strong>${user.posts.length}</strong>
                    <br>
                    Posts
                </div>

            </div>

            <button 
                class="followBtn"
                onclick="followUser(this)">
                Follow
            </button>

        </div>

    `;


    // Display posts

    const postList =
        document.getElementById("postList");

    postList.innerHTML = "";

    user.posts.forEach((post, index) => {

        postList.innerHTML += `

            <div class="post">

                <h3>${user.name}</h3>

                <p>${post}</p>

                <button 
                    class="likeBtn"
                    onclick="likePost(this)">
                    ♡ Like
                </button>

            </div>

        `;
    });
}


// Follow button

function followUser(button) {

    if (button.innerText === "Follow") {

        button.innerText = "Following";
        button.style.background = "#1d9bf0";

    } else {

        button.innerText = "Follow";
        button.style.background = "#222";

    }
}


// Like button

function likePost(button) {

    if (button.innerText === "♡ Like") {

        button.innerText = "♥ Liked";

    } else {

        button.innerText = "♡ Like";

    }
}


// Go back to Home

function goHome() {

    document.getElementById("profilePage").style.display = "none";

    document.getElementById("homePage").style.display = "block";
}


// Start website

displayUsers();

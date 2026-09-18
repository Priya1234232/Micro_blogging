// CURRENT USER
let currentUser = "Priya";

// USERS DATA
const users = {

    monika: {
        name: "Priya",
        username: "@priya",
        bio: "Frontend Developer | Student",
        followers: ["arun", "divya"],
        following: ["arun"],
        posts: [
            {
                id: 1,
                text: "Learning JavaScript today 🚀",
                likes: 12
            },
            {
                id: 2,
                text: "Building my first micro-blogging website!",
                likes: 8
            }
        ]
    },

    arun: {
        name: "Arun",
        username: "@arun",
        bio: "Java Developer ☕",
        followers: ["priya"],
        following: ["priya", "divya"],
        posts: [
            {
                id: 3,
                text: "Java makes problem solving interesting!",
                likes: 15
            }
        ]
    },

    divya: {
        name: "Divya",
        username: "@divya",
        bio: "UI/UX Designer 🎨",
        followers: ["monika", "arun"],
        following: [],
        posts: [
            {
                id: 4,
                text: "Design is not just about colors. It's about experience.",
                likes: 20
            }
        ]
    },

    rahul: {
        name: "Rahul",
        username: "@rahul",
        bio: "Full Stack Developer 💻",
        followers: [],
        following: [],
        posts: [
            {
                id: 5,
                text: "Working on a MERN stack project!",
                likes: 10
            }
        ]
    }
};


// ==========================
// SHOW USERS
// ==========================

function displayUsers() {

    const usersList = document.getElementById("usersList");

    usersList.innerHTML = "";

    for (let username in users) {

        const user = users[username];

        const isFollowing =
            users[currentUser].following.includes(username);

        usersList.innerHTML += `

            <div class="user-card">

                <div class="avatar">
                    ${user.name.charAt(0)}
                </div>

                <h3 onclick="showProfile('${username}')">
                    ${user.name}
                </h3>

                <p>${user.username}</p>

                <p>
                    ${user.followers.length} Followers
                    •
                    ${user.following.length} Following
                </p>

                ${
                    username !== currentUser
                    ?
                    `<button onclick="toggleFollow('${username}')">
                        ${isFollowing ? "Unfollow" : "Follow"}
                    </button>`
                    :
                    `<button onclick="showProfile('${username}')">
                        View Profile
                    </button>`
                }

            </div>
        `;
    }
}


// ==========================
// DISPLAY ALL POSTS
// ==========================

function displayPosts() {

    const postsList = document.getElementById("postsList");

    postsList.innerHTML = "";

    for (let username in users) {

        const user = users[username];

        user.posts.forEach(post => {

            postsList.innerHTML += createPostHTML(
                username,
                post
            );

        });
    }
}


// ==========================
// CREATE POST HTML
// ==========================

function createPostHTML(username, post) {

    const user = users[username];

    return `

        <div class="post">

            <div class="post-header">

                <div class="small-avatar">
                    ${user.name.charAt(0)}
                </div>

                <div>
                    <b onclick="showProfile('${username}')"
                       style="cursor:pointer">
                        ${user.name}
                    </b>

                    <div class="username">
                        ${user.username}
                    </div>
                </div>

            </div>

            <div class="post-content">
                ${post.text}
            </div>

            <button
                class="like-btn"
                onclick="likePost('${username}', ${post.id})">

                ❤️ ${post.likes}

            </button>

        </div>
    `;
}


// ==========================
// CREATE NEW POST
// ==========================

function createPost() {

    const text =
        document.getElementById("postText").value.trim();

    if (text === "") {
        alert("Please write something!");
        return;
    }

    const newPost = {

        id: Date.now(),

        text: text,

        likes: 0
    };

    users[currentUser].posts.unshift(newPost);

    document.getElementById("postText").value = "";

    displayPosts();

    alert("Post created successfully!");
}


// ==========================
// LIKE POST
// ==========================

function likePost(username, postId) {

    const post = users[username].posts.find(
        p => p.id === postId
    );

    if (post) {

        post.likes++;

        displayPosts();

    }
}


// ==========================
// FOLLOW / UNFOLLOW
// ==========================

function toggleFollow(username) {

    if (username === currentUser) {
        return;
    }

    const currentFollowing =
        users[currentUser].following;

    const targetFollowers =
        users[username].followers;


    // CHECK FOLLOWING

    const index =
        currentFollowing.indexOf(username);


    if (index === -1) {

        // FOLLOW

        currentFollowing.push(username);

        targetFollowers.push(currentUser);

    } else {

        // UNFOLLOW

        currentFollowing.splice(index, 1);

        const followerIndex =
            targetFollowers.indexOf(currentUser);

        if (followerIndex !== -1) {

            targetFollowers.splice(
                followerIndex,
                1
            );
        }
    }


    displayUsers();

    // Refresh profile if open

    if (!document
        .getElementById("profilePage")
        .classList.contains("hidden")) {

        showProfile(username);

    }
}


// ==========================
// SHOW PROFILE
// ==========================

function showProfile(username) {

    const user = users[username];

    if (!user) {
        return;
    }

    document
        .getElementById("homePage")
        .classList.add("hidden");

    document
        .getElementById("profilePage")
        .classList.remove("hidden");


    // BASIC INFORMATION

    document.getElementById("profileAvatar")
        .innerText =
        user.name.charAt(0);

    document.getElementById("profileName")
        .innerText =
        user.name;

    document.getElementById("profileUsername")
        .innerText =
        user.username;

    document.getElementById("profileBio")
        .innerText =
        user.bio;


    // STATS

    document.getElementById("profilePosts")
        .innerText =
        user.posts.length;

    document.getElementById("profileFollowers")
        .innerText =
        user.followers.length;

    document.getElementById("profileFollowing")
        .innerText =
        user.following.length;


    // FOLLOW BUTTON

    const followButton =
        document.getElementById("followButton");


    if (username === currentUser) {

        followButton.style.display = "none";

    } else {

        followButton.style.display = "inline-block";

        const following =
            users[currentUser]
            .following
            .includes(username);

        followButton.innerText =
            following
            ? "Unfollow"
            : "Follow";

        followButton.onclick =
            function () {

                toggleFollow(username);

            };
    }


    // PROFILE POSTS

    const postsContainer =
        document.getElementById(
            "profilePostsList"
        );

    postsContainer.innerHTML = "";

    user.posts.forEach(post => {

        postsContainer.innerHTML +=
            createPostHTML(username, post);

    });


    // FOLLOWERS

    displayFollowers(user);
}


// ==========================
// DISPLAY FOLLOWERS
// ==========================

function displayFollowers(user) {

    const followersList =
        document.getElementById(
            "followersList"
        );

    followersList.innerHTML = "";

    if (user.followers.length === 0) {

        followersList.innerHTML =
            "<p>No followers yet.</p>";

        return;
    }


    user.followers.forEach(username => {

        const follower =
            users[username];

        followersList.innerHTML += `

            <div class="follower">

                <div class="small-avatar">
                    ${follower.name.charAt(0)}
                </div>

                <div>

                    <b
                      onclick="showProfile('${username}')"
                      style="cursor:pointer">

                        ${follower.name}

                    </b>

                    <div class="username">
                        ${follower.username}
                    </div>

                </div>

            </div>

        `;
    });
}


// ==========================
// SHOW HOME
// ==========================

function showHome() {

    document
        .getElementById("profilePage")
        .classList.add("hidden");

    document
        .getElementById("homePage")
        .classList.remove("hidden");

    displayUsers();

    displayPosts();
}


// ==========================
// INITIAL LOAD
// ==========================

displayUsers();

displayPosts();

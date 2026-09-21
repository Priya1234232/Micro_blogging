let defaultPosts = [
    {
        id: 1,
        name: "Rahul",
        role: "AI Enthusiast",
        avatar: "R",
        avatarClass: "blue",
        text: "Learning JavaScript today!",
        time: "2 minutes ago",
        likes: 10,
        liked: false
    },
    {
        id: 2,
        name: "Priya",
        role: "Web Developer",
        avatar: "P",
        avatarClass: "pink",
        text: "AI is changing the world!",
        time: "10 minutes ago",
        likes: 1000,
        liked: false
    },
    {
        id: 3,
        name: "Arun",
        role: "Java Developer",
        avatar: "A",
        avatarClass: "green",
        text: "Coding is fun!",
        time: "30 minutes ago",
        likes: 60,
        liked: false
    }
];

let posts = JSON.parse(
    localStorage.getItem("miniTwitterPosts")
);

if (!posts) {
    posts = defaultPosts;
}

function displayPosts() {
    const container =
        document.getElementById("postsContainer");

    container.innerHTML = "";

    posts.forEach(function(post) {

        const postElement =
            document.createElement("div");

        postElement.className = "post";

        postElement.innerHTML = `
            <div class="post-header">
                <div class="avatar ${post.avatarClass}">
                    ${post.avatar}
                </div>

                <div class="post-user">
                    <h3>${post.name}</h3>
                    <p>${post.role}</p>
                </div>
            </div>

            <div class="post-content">
                ${escapeHTML(post.text)}
            </div>

            <div class="post-footer">
                <span class="post-time">
                    ${post.time}
                </span>

                <button
                    class="like-btn ${post.liked ? "liked" : ""}"
                    onclick="likePost(${post.id})"
                >
                    <i class="fa-regular fa-thumbs-up"></i>
                    Like (${post.likes})
                </button>
            </div>
        `;

        container.appendChild(postElement);
    });
}

function createPost() {
    const textarea =
        document.getElementById("postText");

    const text =
        textarea.value.trim();

    if (text === "") {
        showNotification(
            "Please write something before posting."
        );
        return;
    }

    const newPost = {
        id: Date.now(),
        name: "Monika",
        role: "IT student",
        avatar: "M",
        avatarClass: "purple",
        text: text,
        time: "Just now",
        likes: 0,
        liked: false
    };

    posts.unshift(newPost);

    savePosts();

    textarea.value = "";

    displayPosts();

    showNotification(
        "Post published successfully! 🎉"
    );
}

function likePost(id) {
    const post =
        posts.find(function(item) {
            return item.id === id;
        });

    if (!post) {
        return;
    }

    if (post.liked) {
        post.likes--;
        post.liked = false;
    } else {
        post.likes++;
        post.liked = true;
    }

    savePosts();

    displayPosts();
}

function followUser(button) {
    if (
        button.classList.contains("following")
    ) {
        button.classList.remove("following");

        button.innerText = "Follow";

        showNotification(
            "You unfollowed this user."
        );
    } else {
        button.classList.add("following");

        button.innerText = "Following";

        showNotification(
            "You are now following this user! 👍"
        );
    }
}

function savePosts() {
    localStorage.setItem(
        "miniTwitterPosts",
        JSON.stringify(posts)
    );
}

function showHome() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showProfile() {
    const profile =
        document.querySelector(".profile-card");

    profile.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function showUser() {
    showProfile();
}

function logout() {
    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );

    if (confirmLogout) {
        showNotification(
            "You have been logged out."
        );
    }
}

function showNotification(message) {
    const old =
        document.querySelector(".notification");

    if (old) {
        old.remove();
    }

    const notification =
        document.createElement("div");

    notification.className =
        "notification";

    notification.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        ${message}
    `;

    document.body.appendChild(
        notification
    );

    setTimeout(function() {
        notification.remove();
    }, 3000);
}

function escapeHTML(text) {
    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

displayPosts();

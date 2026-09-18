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

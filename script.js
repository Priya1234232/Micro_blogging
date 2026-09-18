let posts = [];

const text = document.getElementById("text");
const count = document.getElementById("count");

text.addEventListener("input", function () {
    count.textContent = text.value.length + " / 200";
});

function addPost() {
    let content = text.value.trim();

    if (content === "") {
        alert("Please write a post!");
        return;
    }

    if (content.length > 200) {
        alert("Maximum 200 characters allowed!");
        return;
    }

    posts.unshift({
        text: content,
        likes: 0,
        date: new Date().toLocaleString()
    });

    text.value = "";
    count.textContent = "0 / 200";
    displayPosts();
}

function displayPosts() {
    let search = document.getElementById("search").value.toLowerCase();

    let result = posts.filter(function(post) {
        return post.text.toLowerCase().includes(search);
    });

    let output = "";

    result.forEach(function(post) {
        let index = posts.indexOf(post);

        output += `
            <div class="post">
                <p>${post.text}</p>
                <small>${post.date}</small>

                <div class="actions">
                    <button class="like" onclick="likePost(${index})">
                        ❤️ ${post.likes}
                    </button>

                    <button class="delete" onclick="deletePost(${index})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("posts").innerHTML =
        output || "<p>No posts found.</p>";
}

function likePost(index) {
    posts[index].likes++;
    displayPosts();
}

function deletePost(index) {
    if (confirm("Delete this post?")) {
        posts.splice(index, 1);
        displayPosts();
    }
}

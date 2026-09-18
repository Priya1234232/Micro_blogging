* {
    box-sizing: border-box;
}

body {
    font-family: Arial;
    background: #eef2ff;
    margin: 0;
}

.container {
    width: 90%;
    max-width: 650px;
    margin: 30px auto;
}

h1 {
    text-align: center;
    color: #2563eb;
}

.profile, form, .post {
    background: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px #ccc;
}

.profile {
    text-align: center;
}

.avatar {
    font-size: 50px;
}

.profile p {
    color: #666;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin: 20px 0;
}

.stats div {
    display: flex;
    flex-direction: column;
}

.stats span {
    color: #777;
    margin-top: 5px;
}

#followBtn {
    background: #2563eb;
    color: white;
    border: 0;
    padding: 10px 25px;
    border-radius: 6px;
    cursor: pointer;
}

#followBtn.following {
    background: #64748b;
}

textarea {
    width: 100%;
    height: 100px;
    padding: 12px;
    resize: none;
    border: 1px solid #bbb;
    border-radius: 6px;
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

button {
    padding: 10px 18px;
    border: 0;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}

#search {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #bbb;
    border-radius: 6px;
}

.post p {
    line-height: 1.5;
}

.post small {
    color: #777;
}

.actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}

.like {
    background: #e11d48;
}

.delete {
    background: #dc2626;
}

@media (max-width: 500px) {
    .container {
        width: 95%;
    }

    .stats {
        gap: 25px;
    }
}

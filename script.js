const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const error = document.getElementById("error");

const postForm = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

fetchButton.addEventListener("click",() => {
    error.textContent = "";
    postList.innerHTML = "<p>Loading...</p>";

    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
            if(!response.ok){
                throw new Error("Unable to fetch posts.");

            }
            return response.json();
        })

        .then(posts => {
            postList.innerHTML = "";
            posts.forEach(post => {
                const postDiv = document.createElement("div");

                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <hr>
                    `;

                    postList.appendChild(postDiv);

            });
        })

        .catch(err => {
            postList.innerHTML = "";
            error.textContent = err.message;
        });

});

postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formError.textContent = "";
    formSuccess.textContent = "";

    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            body: body,
            userId: 1
        })

    })

    .then(response => {
        if(!response.ok){
            throw new Error("Unable to create post.");

        }
        return response.json();

    
    })

    .then(data => {
        formSuccess.innerHTML = `
        <h3>Post Created Successfully!</h3>
        <p><strong>ID:</strong>${data.id}</p>
        <p><strong>Title:</strong>${data.title}</p>
        <p><strong>Body:</strong>${data.body}</p>
        `;

        postForm.reset();

    })

    .catch(err => {

        formError.textContent = err.message;

    });
});
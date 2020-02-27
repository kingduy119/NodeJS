
export function fetchProfileData() {
    let userPromise = fetchUser();
    let postPromise = fetchPosts();
    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postPromise)
    };
}

function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspenser = promise.then(
        r => {
            status = "success";
            result = r;
        },
        err => {
            status = "error";
            result = err;
        }
    );
    return {
        read() {
            if(status === "pending") {
                throw suspenser;
            } else {
                throw result;
            }
        }
    };
}

function fetchUser() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("fetched user");
            resolve({
                name: "Ringo Start"
            });
        }, 1000);
    });
}

function fetchPosts() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("fetched posts");
            resolve([
                { id: 0, text: "I get by witl a little help from my friends"},
                { id: 1, text: "I'd like to be under the sea in an octupus's garden"},
                { id: 2, text: "You got that sand all over your feet"}
            ]);
        }, 2000);
    });
}




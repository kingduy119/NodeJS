
export function fetchProfileData() {
    let userPromise = fetchUser();
    let postPromise = fetchPosts();
    let triviaPromise = fetchTrivia();
    let postTriviaPromise = fetchPostTrivia();

    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postPromise),
        trivia: wrapPromise(triviaPromise),
        posts_trivia: wrapPromise(postTriviaPromise)
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

function fetchPostTrivia() {
    let ringoPostsAtTheTime = ringoPosts;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(ringoPostsAtTheTime);
        }, 1500);
    });
}

function fetchTrivia() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    text: 'The nickname "Ringo" came from habit of wering numerous rings.'
                },
                {
                    id: 2,
                    text: "Plays the drums left-handed with a right-handed drum set."
                },
                {
                    id: 3,
                    text: "Nominated for one Daytime Emmy Award, but did not win"
                }
            ]);
        }, 5000);
    })
}

let ringoPosts = [
    {
      id: 0,
      text:
        "I get by with a little help from my friends"
    },
    {
      id: 1,
      text:
        "I'd like to be under the sea in an octupus's garden"
    },
    {
      id: 2,
      text: "You got that sand all over your feet"
    }
  ];

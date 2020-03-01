import React from "react";

import Home from "../containers/page/Home";
import NameForm from "../containers/page/Form";
import Temperature from "../containers/page/Temperature";
import Containment from "../containers/page/Containment";
import FilterableProductTable from "../containers/page/FilterableProductTable.js";

// Advanced:
import Portal from "../containers/page/advanced/Portal";
import Hook from "../containers/page/advanced/Hook";
import LifeCycle from "../containers/page/advanced/Lifecycle";

// Concurrent Data fetching:
import SuspenseDataFetch from "../containers/page/concurrent-data-fetch/Suspense";
import UIModePattern from "../containers/page/concurrent-data-fetch/ModePattern";

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

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

const dataNavbar = [
    {
        type: "dropdown",
        id: "dropdown_main-concepts",
        name: "Main Concepts",
        links: [
            { path: "/home", name: "Home", component: <Home/> },
            { path: "/form", name: "Form", component: <NameForm/>},
            { path: "/temperature", name: "Temperature", component: <Temperature/>},
            { path: "/containment", name: "Containment", component: <Containment/>},
            { path: "/filterable", name: "Filterable", component: <FilterableProductTable products={PRODUCTS}/>}
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_advanced",
        name: "Advanced",
        links: [
            { path: "/portal", name: "Portal", component: <Portal />},
            { path: "/hook", name: "React Hook", component: <Hook />},
            { path: "/lifecycle", name: "Lifecycle", component: <LifeCycle />},
            { path: "/action/1-4", name: "Other", component: <h2>Other</h2> }
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_concurent-data-fetch",
        name: "Concurent Data Fetch",
        links: [
            { path: "/data-fetch", name: "Suspense Data Fetch", component: <SuspenseDataFetch />},
            { path: "/ui-pattern", name: "UI Mode Pattern", component: <UIModePattern />}
        ]
    }
];

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

export function fetchNavbar() {
    return dataNavbar;
}

function fetchPostTrivia() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(ringoPosts);
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


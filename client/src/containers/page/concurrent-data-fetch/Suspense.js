import React, {
    Suspense
} from "react";

import { fetchProfileData } from "../../../api/FakeApi";

const resoure = fetchProfileData();

export default function ProfilePage() {
    return (
        <Suspense
            fallback={<h1>Loading profile...</h1>}
        >
            <ProfileDetails />
            <Suspense fallback={<h1>Loading posts...</h1>}>
                <ProfileTimeline />
            </Suspense>
        </Suspense>
    );
}

function ProfileDetails() {
    const user = resoure.user.read();
    return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
    const posts = resoure.posts.read();
    return(
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
        </ul>
    );
}



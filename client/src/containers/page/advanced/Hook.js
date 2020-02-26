import React, {
    Component,
    useState,
    useEffect
} from "react";



export default function Hook() {
    const [count, setCount] = useState(0);
    const [fruit, setFruit] = useState("babana");

    useEffect(function setTitle() {
        document.title = `You ${count} times`;
    });

    return(
        <div>
            <p>You clicked: {count} times</p>
            <button
                onClick={() => setCount(count + 1)}
            >Click</button>
            <p>Fruit: {fruit}</p>
        </div>
    );
}

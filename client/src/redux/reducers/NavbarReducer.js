
import { fetchNavbar } from "../../api/FakeApi";

const init = fetchNavbar();

export default function NavbarReducer(state = init, action) {
    switch(action.type) {
        default:
            return state;
    }
}


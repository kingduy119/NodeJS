import React from 'react';
import FilterLink from '../containers/FilterLinkContainer';
import {
    VisibilityFilters
} from '../store/actions/actions-todo';


const Footer = () => (
    <div>
        <span>Show: </span>
        <br />

        <FilterLink
            filter={VisibilityFilters.SHOW_ALL}
        >
            All:
        </FilterLink>
        <br />

        <FilterLink
            filter={VisibilityFilters.SHOW_COMPLETED}
        >
            Completed:
        </FilterLink>
        <br />

        <FilterLink
            filter={VisibilityFilters.SHOW_ACTIVE}
        >
            Active:
        </FilterLink>
        <br />
    </div>
);

export default Footer;

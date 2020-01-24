import React from 'react';
import FilterLink from '../containers/FilterLinkContainer';
import {
    VisibilityFilters
} from '../store/actions/actions-todo';


const Footer = () => (
    <div>
        <span>Show: </span>
        <FilterLink filter={VisibilityFilters.SHOW_ALL}>
            All:
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
            Completed:
        </FilterLink>
        <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
            Active:
        </FilterLink>
    </div>
);

export default Footer;

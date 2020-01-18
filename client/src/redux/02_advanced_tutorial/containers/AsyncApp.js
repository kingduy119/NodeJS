import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import  {
    selectSubreddit,
    fetchPostsIfNeed,
    invalidateSubreddit
} from '../actions';
import Picker from '../component/Picker';
import Posts from '../component/Posts';


class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeed(selectSubreddit));
    }

    componentDidUpdate(prevProps) {
        if(this.props.selectSubreddit !== 
            prevProps.selectedSubreddit) {
                const { dispatch, selectSubreddit } = this.props;
                dispatch(fetchPostsIfNeed(selectSubreddit));
            }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectedSubreddit(nextSubreddit));
        this.props.dispatch(fetchPostsIfNeed(nextSubreddit));
    }

    handleRefreshClick(event) {
        event.preventDefault();

        const { dispatch, selectedSubreddit} = this.props;
        dispatch(invalidateSubreddit(selectSubreddit));
        dispatch(fetchPostsIfNeed(selectSubreddit));
    }
}

export default AsyncApp;


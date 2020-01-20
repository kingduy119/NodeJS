import { Component } from 'react';
import { connect } from 'react-redux';
import {
    loadPosts,
    loadPostsSuccess,
    loadPostsFailure,
    loadPostsRequest
} from './actions/actionCreators';


class Posts extends Component {
    componentDidMount(){
        this.props.dispatch(loadPosts(this.props.userId));
    }

    componentDidUpdate(prevProps){
        if(prevProps.userId !== this.props.userId) {
            this.props.dispatch(loadPosts(this.props.userId));
        }
    }


    render() {
        if(this.props.isFetching) {
            return <p>Loadding...</p>;
        }

        const posts = this.props.posts.map(post => (
            <Posts post={post} key={post.id} />
        ));
        return <div>{posts}</div>;
    }
}

export default connect(state => ({
    posts: state.posts,
    isFetching: state.isFetching
}))(Posts);




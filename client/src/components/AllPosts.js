class AllPosts extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount(){
    fetch('/api/v1/posts.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ posts: data }) });
  }
  
  render(){
    var post = this.state.posts.map((post) => {
      return(
      <div key={post.id}>
        <h1>{post.name}</h1>
        <p>{post.description}</p>
      </div>
      )
    })
    return(
      <div>
      {posts}
    </div>
    )
  }  
}
  
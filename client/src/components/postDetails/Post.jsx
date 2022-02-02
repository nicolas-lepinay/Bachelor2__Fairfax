import "./post.css";

export default function Post() {

    return (
        <div className="post-container">
            <div className="post-title">
                <h2>Post Title</h2>
            </div>
            <div className="post-user_info">
                <img className="post-user_info-pfp" src="https://source.unsplash.com/100x100" />
                <h4>John Doe</h4>
            </div>
            <div class="post-content">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
            <div className="post-interactions">
            <div className="post-interaction">
                <p>67</p>   
                <img src="assets/postDetails/like.png" alt="" />
            </div>
                <img id="needInvert" className="post-interaction" src="assets/postDetails/bookmark.png" alt="Bookmark" />
                <p className="post-interaction" >Reply</p>
            </div>
            <div className="post-infos">
                <span className="post-infos_category">
                    <p className="post-infos_category-name">Replies</p>
                    <p className="post-infos_category-value">3</p>
                </span>
                <span className="post-infos_category">
                    <p className="post-infos_category-name">Views</p>
                    <p className="post-infos_category-value">343</p>
                </span>
                <span className="post-infos_category">
                    <p className="post-infos_category-name">Likes</p>
                    <p className="post-infos_category-value">67</p>
                </span>
                <span className="post-infos_category">
                    <p className="post-infos_category-name">Last Reply</p>
                    <p className="post-infos_category-value">13hrs</p>
                </span>
            </div>
        </div>

    )
}
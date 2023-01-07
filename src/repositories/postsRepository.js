import { connectionDB } from "../db/db.js";

async function createPost(user_id, content, url, title, description, image) {
  return connectionDB.query(
    "INSERT INTO posts (user_id, content, url, url_title, url_description, url_image) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;",
    [user_id, content, url, title, description, image]
  );
}

async function getPosts() {
  return connectionDB.query(
    "SELECT posts.*, users.user_name, users.profile_picture FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id DESC LIMIT 20;"
  );
}

function getPostsByHashtag(id) {
  return connectionDB.query(
    `SELECT * FROM posts WHERE id IN (SELECT post_id FROM posts_hashtags WHERE hashtag_id = $1)`,
    [id]
  );
}

function searchPost(id) {
  return connectionDB.query(`SELECT * FROM posts WHERE id=$1`, [id])
}

function deletePost(id) {
  return connectionDB.query(`DELETE FROM posts WHERE id=$1`, [id]);
}

function updatePost(field, content, id) {
  return connectionDB.query(`UPDATE posts SET ${field}=$1 WHERE id=$2`, [content, id]);
}

function updatePutPost(content, url, id) {
  return connectionDB.query(`UPDATE posts SET content=$1, url=$2 WHERE id=$3`, [content, url, id]); 
}

const postsRepository = {
  createPost,
  getPosts,
  getPostsByHashtag,
  searchPost,
  deletePost,
  updatePost,
  updatePutPost
};

export default postsRepository;

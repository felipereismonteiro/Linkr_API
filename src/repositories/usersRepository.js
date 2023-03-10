import { connectionDB } from "../db/db.js";

export function getUsersByName(userId, name) {
  return connectionDB.query(
    `SELECT 
            users.id, users.user_name, users.profile_picture,
            CASE
                WHEN users.id = SOME (array_agg(followers_followed.followed_id))
                THEN true
                ELSE false
                END AS is_followed 
        FROM 
            users
        LEFT JOIN
            followers_followed
        ON
            followers_followed.follower_id = $1 
        WHERE 
            users.user_name ILIKE $2 || '%'
        GROUP BY 
            users.id
        ORDER BY 
            is_followed
        DESC
        
        `,
    [userId, name]
  );
}

function getUserInfos(id) {
  return connectionDB.query(`SELECT user_name, profile_picture FROM  users WHERE id=$1`, [id]);
}

const usersRepository = {
  getUsersByName,
  getUserInfos,
};

export default usersRepository;

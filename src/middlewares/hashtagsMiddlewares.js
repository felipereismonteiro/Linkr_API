import hashtagsRepository from "../repositories/hashtagsRepository.js";

export async function hashtagAlreadyRegisteredValidation(req, res, next) {
  const { content } = req.body;
  const {name} = req.params
  console.log("validation")
  try {
    if (req.method === "POST") {

      console.log("POOST")
      const hashtags = hashtagsRepository.filterHashtags(content);

      res.locals.hashtags = hashtags;

      if (hashtags.length === 0) {
        return next();
      }

      const { rows } = await hashtagsRepository.getHashtagsByNames(hashtags);

      if (rows.length !== 0) {
        res.locals.existingHashtags = rows;
      }

      next();
    }
  
  } catch (err) {
    res.status(500).send(err.message);
  }
}

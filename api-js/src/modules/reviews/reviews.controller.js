const services = require("./reviews.service");

const createReview = async (req, res) => {
  const { productSlug, rating, comment } = req.body;
  const userId = req.user?.id;

  const review = await services.createReview(productSlug, rating, comment, userId);
  return res.status(201).json(review);
};

const getReviews = async (req, res) => {
  const { slug } = req.params;
  const reviews = await services.getReviews(slug);
  return res.json(reviews);
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  const review = await services.getReviewById(id);
  return res.json(review);
};

const updateReview = async (req, res) => {
  const id = req.params.id;
  const { rating, comment } = req.body;
  const review = await services.updateReview(id, rating, comment);
  return res.json(review);
};

const deleteReview = async (req, res) => {
  const review = await services.deleteReview(req.params.id);
  return res.json(review);
};

module.exports = { getReviews, createReview, getReviewById, updateReview, deleteReview };

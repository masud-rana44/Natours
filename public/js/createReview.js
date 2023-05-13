/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { closeReviewForm } from './toggleReviewForm';

const reviewEl = document.querySelector('.review');

export const createReview = async (rating, review) => {
  try {
    const tour = reviewEl.dataset.tourId;
    const user = reviewEl.dataset.userId;

    const res = await axios({
      method: 'POST',
      url: '/api/v1/reviews',
      data: {
        rating,
        review,
        tour,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review submitted successfully!');
      closeReviewForm();
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const deleteReview = async (reviewId, e) => {
  try {
    const el = e.target.closest('.review-card');
    el.style.display = 'none';

    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/reviews/${reviewId}`,
    });

    showAlert('success', 'Review deleted successfully!');
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

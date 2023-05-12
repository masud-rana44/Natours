/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const reviewEl = document.querySelector('.review');

export const createReview = async (rating, review) => {
  try {
    const tour = reviewEl.dataset.tourId;
    const user = reviewEl.dataset.userId;

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/reviews',
      data: {
        rating,
        review,
        tour,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review submitted successfully!');
      // window.setTimeout(() => {
      //   location.assign('/emailConfirmation');
      // }, 500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const deleteReview = async (reviewId, e) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8000/api/v1/reviews/${reviewId}`,
    });

    const el = e.target.closest('.review-card');
    el.style.display = 'none';

    showAlert('success', 'Review deleted successfully!');
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

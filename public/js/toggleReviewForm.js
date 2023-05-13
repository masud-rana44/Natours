/* eslint-disable */
const review = document.querySelector('.review');
const overlay = document.querySelector('.overlay');
const btnCloseReviewForm = document.querySelector('.btn--close-review');
const btnsReview = document.querySelectorAll('.review-btn');

//////////////////////////////////////
// review Window

const openReviewForm = () => {
  review.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

export const closeReviewForm = () => {
  review.classList.add('hidden');
  overlay.classList.add('hidden');
};

export const reviewFormHandler = () => {
  if (btnsReview)
    btnsReview.forEach((btn) => {
      btn.addEventListener('click', () => {
        openReviewForm();
        const tourId = btn.dataset.tourId;
        const userId = btn.dataset.userId;

        review.setAttribute('data-tour-id', tourId);
        review.setAttribute('data-user-id', userId);
      });
    });
  if (btnCloseReviewForm)
    btnCloseReviewForm.addEventListener('click', closeReviewForm);
  if (overlay) overlay.addEventListener('click', closeReviewForm);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !review.classList.contains('hidden')) {
      closeReviewForm();
    }
  });
};

/* eslint-disable */
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { sendEmail } from './forgotPassword';
import { resetPassword } from './resetPassword';
import { updateSettings } from './updateSettings';
import { reviewFormHandler } from './toggleReviewForm';
import { createReview, deleteReview } from './createReview';
import { bookTour } from './stripe';

// DOM ELEMENT
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const reviewForm = document.querySelector('.review__form');
const logOutBtn = document.querySelector('.nav__el--logout');
const forgotPasswordForm = document.querySelector('.form--forgotPassword');
const resetPasswordForm = document.querySelector('.form--resetPassword');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const btnsReview = document.querySelectorAll('.review-btn');
const btnsReviewDelete = document.querySelectorAll('.btn__review--delete');

// DELEGATION
if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const data = { name, email, password, passwordConfirm };
    signup(data);
  });

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (forgotPasswordForm)
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    sendEmail(email);
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = window.location.pathname.split('/')[5];
    resetPassword(token, password, passwordConfirm);
  });

if (reviewForm)
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    createReview(rating, review);
    window.setTimeout(() => {
      document.getElementById('review').value = '';
      document.getElementById('rating').value = '5';
    }, 1500);
  });
if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings('data', form);
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings('password', {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--save-password').textContent = 'Save password';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (btnsReview) reviewFormHandler();

if (btnsReviewDelete)
  btnsReviewDelete.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const reviewId = e.target.dataset.reviewId;
      deleteReview(reviewId, e);
    })
  );

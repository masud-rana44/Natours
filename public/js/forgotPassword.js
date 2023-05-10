/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const sendEmail = async function (email) {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/forgotPassword',
      data: { email },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Email send successfully!');
      window.setTimeout(() => {
        location.assign('/emailConfirmation');
      }, 500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

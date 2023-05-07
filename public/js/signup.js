/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const singup = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/signup',
      data,
    });

    if (res.status === 'success') {
      showAlert('success', 'Account create successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 15000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

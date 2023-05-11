/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createReview = async (data) => {
  console.log(data);
  const res = await axios({
    method: 'POST',
    url: '{{URL}}api/v1/reviews',
    data,
  });

  if (res.data.status === 'success') {
    showAlert('success', 'Review submitted successfully!');
  }
  try {
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

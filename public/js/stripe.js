/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51N4PGDC0f6I53doGButnq4P7OBEtIANRcmg4rscSshlawiy3sRXbcvgxsw6N21DkWWmaZVoxGnNmBiua2lD6AooA004Db0AqmB'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session form API
    const session = await axios(
      `http://localhost:8000/api/v1/bookings/checkout-session/${tourId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer sk_test_51N4PGDC0f6I53doGWxRBjCEiO4j4koR7SshLktc7mlK3gyZv0LeRy9Y7yEQAyWDzWGcKLYOZBO1YanfxQoFshLdv00qGmgFnh3`,
        },
      }
    );

    console.log(session);

    // 2) Create checkout from + charge credit card
  } catch (err) {
    showAlert('error', err);
  }
};

/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51N4PGDC0f6I53doGButnq4P7OBEtIANRcmg4rscSshlawiy3sRXbcvgxsw6N21DkWWmaZVoxGnNmBiua2lD6AooA004Db0AqmB'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session form API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    // 2) Create checkout from + charge credit card
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

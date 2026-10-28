/**
 * Checkout configuration.
 *
 * Nothing here fakes a purchase: until `orderingUrl` points at a real checkout
 * (a payment provider, phone-ordering page, etc.) the cart shows a clearly
 * labelled placeholder instead of a fake "order placed" success state.
 */
export const ordering = {
  /** Set to your live ordering URL once a checkout integration exists. */
  url: '',
  label: 'Proceed to Checkout',
  placeholderNote:
    'Checkout is not connected yet. Add your ordering URL in src/config.ts to take real orders.',
};

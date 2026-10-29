import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgePercent, CheckCircle2, Loader2, Lock, ShoppingBag, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { currency } from '../data/products';
import { site } from '../data/site';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../context/CartContext';

type Fields = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes: string;
};

const emptyForm: Fields = { fullName: '', email: '', phone: '', address: '', city: '', zip: '', notes: '' };

export function CheckoutPage() {
  const { items, subtotal, clearCart, count, notify } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState<Fields>(emptyForm);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [couponInput, setCouponInput] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<{
    id: string;
    items: CartItem[];
    total: number;
    name: string;
    address: string;
    discount: number;
    delivery: number;
  } | null>(null);

  const discount = appliedCode ? subtotal * site.promoDiscount : 0;
  const delivery = subtotal >= site.freeDeliveryThreshold || subtotal === 0 ? 0 : site.deliveryFee;
  const total = useMemo(() => Math.max(0, subtotal - discount + delivery), [subtotal, discount, delivery]);

  const update = (field: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() === site.promoCode) {
      setAppliedCode(site.promoCode);
      setCouponError('');
      notify(`${site.promoCode} applied — ${site.promoDiscount * 100}% off`);
    } else {
      setAppliedCode(null);
      setCouponError('That code is not valid.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Fields> = {};
    if (values.fullName.trim().length < 2) next.fullName = 'Enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = 'Enter a valid email';
    if (values.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number';
    if (values.address.trim().length < 5) next.address = 'Enter your delivery address';
    if (values.city.trim().length < 2) next.city = 'Enter your city';
    if (values.zip.trim().length < 3) next.zip = 'Enter your postcode';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setPlaced({
        id: `TB-${Math.floor(100000 + Math.random() * 899999)}`,
        items,
        total,
        name: values.fullName,
        address: `${values.address}, ${values.city} ${values.zip}`,
        discount,
        delivery,
      });
      clearCart();
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  /* ------------------------------ confirmation ------------------------------ */
  if (placed) {
    return (
      <div className="min-h-screen bg-ink px-5 pb-24 pt-16 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-card p-7 sm:p-10"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-brand" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand">Order confirmed</p>
              <h1 className="display mt-1 text-3xl text-white">Thanks, {placed.name.split(' ')[0]}!</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">
            Your order <span className="font-semibold text-white">{placed.id}</span> is in the kitchen.
            Estimated delivery to <span className="text-white">{placed.address}</span> in 25–35 minutes.
          </p>

          <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-[#101010] p-4">
            {placed.items.map((item) => (
              <div key={item.id} className="flex justify-between text-[13px] text-muted">
                <span>
                  {item.qty} × {item.name}
                </span>
                <span className="text-white">{currency(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-[13px]">
              {placed.discount > 0 && (
                <div className="flex justify-between text-brand">
                  <span>Discount</span>
                  <span>-{currency(placed.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span>{placed.delivery === 0 ? 'Free' : currency(placed.delivery)}</span>
              </div>
              <div className="flex justify-between pt-1 text-[15px] font-semibold text-white">
                <span>Total paid on delivery</span>
                <span>{currency(placed.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/menu')} className="btn-brand">
              Order Again
            </button>
            <Link to="/" className="btn-ghost">
              Back To Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* -------------------------------- empty cart ------------------------------- */
  if (count === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-white/40">
          <ShoppingBag className="h-8 w-8" />
        </span>
        <h1 className="display mt-6 text-3xl text-white">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Add something from the menu and it will show up right here.
        </p>
        <Link to="/menu" className="btn-brand mt-7">
          Browse Menu
        </Link>
      </div>
    );
  }

  const inputClass = (invalid?: string) =>
    `w-full rounded-xl border bg-[#101010] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand ${
      invalid ? 'border-red-500/70' : 'border-white/12'
    }`;

  return (
    <div className="min-h-screen bg-ink pb-24 pt-12 sm:pt-16">
      <div className="container-page">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Continue shopping
        </Link>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="font-script text-lg text-brand">Almost there</span>
            <h1 className="display mt-1 text-[clamp(32px,5vw,52px)] text-white">Checkout</h1>
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            {count} item{count === 1 ? '' : 's'} · demo checkout
          </p>
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.25fr_0.85fr]">
          {/* ------------------------------- form ------------------------------- */}
          <form id="checkout-form" onSubmit={handleSubmit} noValidate className="rounded-3xl border border-white/10 bg-card/70 p-6 sm:p-8">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="co-name" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Full name
                </label>
                <input id="co-name" value={values.fullName} onChange={update('fullName')} placeholder="Alex Carter" className={inputClass(errors.fullName)} />
                {errors.fullName && <p className="mt-1.5 text-[11px] text-red-400">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="co-email" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Email
                </label>
                <input id="co-email" type="email" value={values.email} onChange={update('email')} placeholder="you@email.com" className={inputClass(errors.email)} />
                {errors.email && <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="co-phone" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Phone
                </label>
                <input id="co-phone" value={values.phone} onChange={update('phone')} placeholder="+1 555 000 0000" className={inputClass(errors.phone)} />
                {errors.phone && <p className="mt-1.5 text-[11px] text-red-400">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-address" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Delivery address
                </label>
                <input id="co-address" value={values.address} onChange={update('address')} placeholder="128 Ember Street, Apt 4B" className={inputClass(errors.address)} />
                {errors.address && <p className="mt-1.5 text-[11px] text-red-400">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="co-city" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  City
                </label>
                <input id="co-city" value={values.city} onChange={update('city')} placeholder="New York" className={inputClass(errors.city)} />
                {errors.city && <p className="mt-1.5 text-[11px] text-red-400">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="co-zip" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Postcode
                </label>
                <input id="co-zip" value={values.zip} onChange={update('zip')} placeholder="10013" className={inputClass(errors.zip)} />
                {errors.zip && <p className="mt-1.5 text-[11px] text-red-400">{errors.zip}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-notes" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Delivery notes <span className="normal-case tracking-normal text-white/30">(optional)</span>
                </label>
                <textarea
                  id="co-notes"
                  rows={3}
                  value={values.notes}
                  onChange={update('notes')}
                  placeholder="Ring the bell twice, leave at the door…"
                  className={`${inputClass()} resize-none`}
                />
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-[#101010] p-4">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <p className="text-[11.5px] leading-relaxed text-muted/75">
                This is a demo checkout — no payment is taken and no card details are required.
                Pay cash or card on delivery. Connect a payment provider to accept online payments.
              </p>
            </div>
          </form>

          {/* ----------------------------- summary ----------------------------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-card p-6">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white">Order summary</h2>

              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-11 w-11 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] text-white">{item.name}</p>
                      <p className="text-[11px] text-white/40">Qty {item.qty}</p>
                    </div>
                    <span className="text-[12.5px] text-white">{currency(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-white/10 pt-4">
                <label htmlFor="coupon" className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Coupon code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/35" />
                    <input
                      id="coupon"
                      value={couponInput}
                      onChange={(event) => {
                        setCouponInput(event.target.value.toUpperCase());
                        setCouponError('');
                      }}
                      placeholder="WELCOME20"
                      className="w-full rounded-xl border border-white/12 bg-[#101010] py-2.5 pl-9 pr-3 text-[12px] uppercase tracking-[0.12em] text-white placeholder:text-white/25 outline-none focus:border-brand"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="rounded-xl border border-brand/60 px-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand transition-colors hover:bg-brand hover:text-ink"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="mt-1.5 text-[11px] text-red-400">{couponError}</p>}
                {appliedCode && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <BadgePercent className="h-3.5 w-3.5" />
                    {appliedCode} applied — {site.promoDiscount * 100}% off
                  </p>
                )}
              </div>

              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[12.5px]">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-white">{currency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-brand">
                    <span>Discount</span>
                    <span>-{currency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>Delivery</span>
                  <span className="text-white">{delivery === 0 ? 'Free' : currency(delivery)}</span>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">Total</span>
                  <span className="font-display text-2xl text-brand">{currency(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-brand mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Placing order
                  </>
                ) : (
                  <>Place Order · {currency(total)}</>
                )}
              </button>
              <p className="mt-3 text-center text-[10px] text-white/30">
                Free delivery on orders over {currency(site.freeDeliveryThreshold)}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

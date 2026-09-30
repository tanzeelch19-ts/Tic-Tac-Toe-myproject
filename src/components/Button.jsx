const BASE =
  'cursor-pointer rounded-xl border-2 border-edge px-6 py-3 font-semibold shadow-[0_4px_0_0_var(--edge)] ' +
  'transition duration-100 hover:-translate-y-px active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--edge)] ' +
  'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-x';

const VARIANTS = {
  primary: 'bg-x text-on-accent',
  secondary: 'bg-tile text-ink',
};

export default function Button({ variant = 'secondary', className = '', ...props }) {
  return <button type="button" className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />;
}
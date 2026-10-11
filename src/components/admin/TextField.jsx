import { forwardRef } from 'react'

const inputBase =
  'w-full rounded-xl border border-text-gray/30 bg-bg py-3 text-sm text-text-dark placeholder-text-gray outline-none transition focus:border-pink-accent focus:ring-2 focus:ring-pink-accent/30'

const TextField = forwardRef(function TextField(
  { id, label, icon: Icon, trailing, className = '', ...props },
  ref,
) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-dark">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-gray" />
        )}
        <input
          id={id}
          ref={ref}
          className={`${inputBase} ${Icon ? 'pl-11' : 'pl-4'} ${className}`}
          {...props}
        />
        {trailing}
      </div>
    </div>
  )
})

export default TextField

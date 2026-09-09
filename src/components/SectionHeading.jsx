export default function SectionHeading({ title, subtitle, align = 'center', action }) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : 'md:text-left'

  return (
    <div className={`max-w-2xl ${alignClass} mb-8 md:mb-10 ${align !== 'center' ? '' : ''}`}>
      {action && (
        <div className={`${align === 'center' ? 'flex justify-center' : 'justify-end'} mb-4 lg:hidden`}>
          {action}
        </div>
      )}
      <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
        {title}
      </h2>
      {subtitle && <p className="font-body-md text-body-md text-secondary">{subtitle}</p>}
      {action && (
        <div className={`hidden lg:flex ${align === 'center' ? 'justify-center' : 'justify-end'} mt-4`}>
          {action}
        </div>
      )}
    </div>
  )
}
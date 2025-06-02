const Card = ({ children, className = "" }) => {
  const baseClasses = "rounded-lg border shadow-sm"

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}

export default Card

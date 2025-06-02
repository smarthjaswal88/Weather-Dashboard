const Alert = ({ children, className = "" }) => {
  const baseClasses = "relative w-full rounded-lg border p-4"

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}

export default Alert

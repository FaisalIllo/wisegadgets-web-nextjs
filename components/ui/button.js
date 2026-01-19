function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

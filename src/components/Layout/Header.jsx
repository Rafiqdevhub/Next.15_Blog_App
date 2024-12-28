
const Header = () => {
  return (
  <header className="fixed top-0 left-0 right-0 bg-white z-50">
    <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
            <a href="/" className="font-bold text-xl">Logo</a>
            <ul className="flex">
            <li className="ml-6"><a href="/">Home</a></li>
            <li className="ml-6"><a href="/about">About</a></li>
            <li className="ml-6"><a href="/services">Services</a></li>
            <li className="ml-6"><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  </header>
  )
}

export default Header

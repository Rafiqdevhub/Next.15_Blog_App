import Header from './Header'

const Layout = ({children}) => {
    const isAuth = false
return (
<div className="min-h-screen bg-white">
    {isAuth && <Header />}
    {children}
</div>
)
}

export default Layout

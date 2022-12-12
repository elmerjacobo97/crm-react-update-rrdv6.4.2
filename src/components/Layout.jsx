import {Link, Outlet, useLocation} from "react-router-dom";

const Layout = () => {
    const {pathname} = useLocation()

    return (
        <div className={'md:flex md:min-h-screen'}>
            <aside className={'md:w-1/4 bg-blue-900 px-5 py-10'}>
                <h2 className={'text-4xl font-black text-center text-white'}>CRM - Clientes</h2>

                <nav className={'mt-10'}>
                    <Link
                        className={`${pathname === '/' ? 'text-blue-300' : 'text-white'} block mt-2 hover:text-blue-300 transition`}
                        to={'/'}
                    >Clientes</Link>
                    <Link
                        className={`${pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} block mt-2 hover:text-blue-300 transition`}
                        to={'/clientes/nuevo'}
                    >Nuevo Cliente</Link>
                </nav>
            </aside>

            <main className={'md:w-3/4 p-10 md:h-screen overflow-scroll'}>
                {/* children */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
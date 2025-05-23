import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }

    return (
        <>
            <div className='w-full bg-purple-800 text-gray-300 flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold text-yellow-400">Lau Styllus</Link>

                    <div className='flex gap-4'>
                        <span className="hover:text-yellow-400">Postagens</span>
                        <span className="hover:text-yellow-400">Temas</span>
                        <span className="hover:text-yellow-400">Cadastrar tema</span>
                        <span className="hover:text-yellow-400">Perfil</span>
                        <Link to='' onClick={logout} className='hover:underline text-yellow-400'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar

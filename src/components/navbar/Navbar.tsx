import { Link } from "react-router-dom";

function Navbar() {


  return (
    <div className='w-full bg-purple-800 text-gray-300 flex justify-center py-4'>
      <div className="container flex justify-between text-lg">
        <Link to='/home' className="text-2xl font-bold text-yellow-400 pl-2.5">Lau Styllus</Link>

      </div>
    </div>
  );
}

export default Navbar;
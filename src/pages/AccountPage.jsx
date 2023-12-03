import { useContext, useState } from "react";
import { UserContext } from "../component/UserContext";
import { Navigate, Link, useParams } from "react-router-dom"; // Add Link here
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function AccountPage() {
  const { ready, user,setUser } = useContext(UserContext);
  const [toHomePage,setToHomePage] = useState(null)
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  async function logout(){
    await axios.post('logout');
    setToHomePage('/')
    setUser(null);
  }

  if(toHomePage){
    return <Navigate to={toHomePage} />
  }

  if (!ready) {
    return 'Loading.....';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  

  function linkClasses (type=null){
    let classes = 'p-2 px-6';
    if (type === subpage ){
        classes +=' text-white bg-primary rounded-full';
    }
    return classes;
  }

  return (
    <div className="">
      <nav className="w-full  flex justify-center mt-8 gap-4 mb-2">
        <Link className={linkClasses('profile')}  to={'/account'}> My profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings </Link>
        <Link className={linkClasses('places')} to={"/account/places"}>My accommodations</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})
            <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
            <PlacesPage />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../component/Perks";
import axios from "axios";

export default function PlacesPage(){
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('')
    const [addedPhotos,setAddedPhotos] = useState([])
    const [photoLink,setPhotoLink] = useState('')
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [maxGuests,setMaxGuests] = useState(1)

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4s">{text}</h2>
        )
    };
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){
        return(
            <>
                {inputHeader (header) }
                {inputDescription (description) }
            </>
        )
    }
    // add photo with my desktop
    function uploadPhoto(ev){
        const files =ev.target.file;
        const data= new FormData();
        data.set('photos',files);
        axios.post('/upload',data,{headers : {'Content-type':'multipart/form-data'} }).then(response => {
            const {data:filename} = response;
            setAddedPhotos(prev => [...prev, filename]); 
        })
    }

    // add photo with link
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('http://localhost:3000/upload-by-like', { link: photoLink });
        setAddedPhotos(prev => [...prev, filename]);
        setPhotoLink('');
    }
    
    

    return(
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={'/account/places/new'}  className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' &&(
                <div className="">
                    <from>
                        {/* for title */}
                        {preInput ('Title')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: my lovely .." />
                        {preInput ('Address','Address to this place')}
                        <input value={address} onChange={ev => setAddress(ev.target.value)} type="text" placeholder="Address" />
                        {/* for Photos */}
                        {preInput ('Photos','more = butter')}
                        <div className="flex gap-2">
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}  type="text" placeholder={'Add using a link ...jpg'} />
                            <button className="bg-gray-200 px-4 rounded-2xl hover:bg-gray-300" onClick={addPhotoByLink}>Add&nbsp;photo</button>
                        </div>
                        <div className="grid gap-3 grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2 ">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link} className="">
                                    <img className="rounded-2xl" src={'http://localhost:3000' + link} alt="" />
                                </div>
                            ))}
                            <label className="flex items-center justify-center gap-1 text-gray-500 text-xl  border bg-transparent rounded-2xl p-2">
                                <input type="file" className="hidden" onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        {/* description */}
                        {preInput ('Description','description of the place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                        {/*  */}
                        {preInput ('Perks','select all the perks of your place')  }
                        <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {/*  */}
                        {preInput ('Extra info',"house rules, etc")}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        {/*  */}
                        {preInput ('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="">
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder="14:00"/>
                            </div>
                            <div className="">
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text"  placeholder="00:00"/>
                            </div>
                            <div className="">
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number"   placeholder="3"/>
                            </div>
                        </div>
                        <div className="">
                            <button className="primary mt-4 hover:bg-[#af2d47]">Save</button>
                        </div>
                    </from>
                </div>
            )}
        </div> 
    )
}
import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';
import "leaflet/dist/leaflet.css"
const position = [23.6850, 90.3563]

const Coverage = () => {
    const serviceCenter=useLoaderData()
    //console.log(serviceCenter)
    const mapRef=useRef(null)

     const handleLocation=e=>{
        e.preventDefault()
        const location=e.target.loc.value
        const district=serviceCenter.find(cen=>cen.district.toLowerCase().includes(location.toLowerCase()))
        //console.log(district)
        if (district){
            const coor=[district.latitude,district.longitude]
            mapRef.current.flyTo(coor,14)
        }
    }
    return (
       <div className='max-w-7xl mx-auto my-20'>
            <h1 className='font-extrabold text-cyan-900 mb-4 text-2xl '>We are available 64 district</h1>
            <div className='mb-20'>
                <form onSubmit={handleLocation}>
                    <label className='input'>
                            <input
                            name='loc'
                                type='search'
                                placeholder='Search location'
                            />
                    </label>
                </form>

            </div>
            <div className='w-full h-[700px] border-1'>
                 <MapContainer className='w-full h-full' 
                 center={position} 
                 zoom={8} 
                 scrollWheelZoom={false}
                 ref={mapRef}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
        serviceCenter.map((center,index)=><Marker 
        key={index} position={[center.latitude,center.longitude]}>
      <Popup>
       <strong>{center.district}</strong> <br /><p>{center.covered_area.join( )}</p>
      </Popup>
    </Marker>

        )

    }
    
  </MapContainer>
            </div>
            
        </div>
    );
};

export default Coverage;
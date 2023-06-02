import { useEffect, useState } from 'react'

// components
import BeefDetails from '../components/BeefDetails'

const Home = () => {
    const [beefs, setBeefs] = useState(null)

    useEffect(() => {
        const fetchBeefs = async () => {
            try {
                // only for development, must point to full uri on release
                const response = await fetch("/api/beef")
                const json = await response.json()
    
                if (response.ok) {
                    setBeefs(json)
                } else {
                    // Handle non-200 status codes or invalid JSON responses
                    console.error('Error:', json)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    
        fetchBeefs()
    }, [])

    return (
       <div className="home">
        <div className="beefs">
            {beefs && beefs.map((beef) => (
                <BeefDetails key={beef._id} beef={beef}/>
            ))}
        </div>
       </div> 
    )
}

export default Home
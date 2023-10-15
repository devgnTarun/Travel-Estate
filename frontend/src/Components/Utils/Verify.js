import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useParams , useHistory} from 'react-router-dom'
import { Link } from 'react-router-dom'
import MetaData from '../Utils/MetaData'
import Loader from './Loader'

const Verify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const params = useParams()
    const history = useHistory()
    const {isAuthenticated} = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setLoading(true)
                let url = `/api/users/${params.id}/verify/${params.token}`
                const {data} = await axios.get(url);
                setValidUrl(true)
                setLoading(false)

            } catch (error) {
                setValidUrl(false)
                setLoading(false)
            }
        
        }
        verifyEmail()
        if(isAuthenticated) {
            history.push('/')
        }
    }, [params.id , params.token , history , isAuthenticated])
    
  return (
   <>
   <MetaData title='Email Verify'/>
        {
            loading ? <Loader/> :  <>

            {
                validUrl ? (
                    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="text-center">
                        <i style={{cursor : 'pointer'}} className="mx-auto h-12 w-auto text-green-500 text-4xl fas fa-check-circle" aria-hidden="true"></i>
                        <h2 className="mt-6 text-center text-5xl font-extrabold text-green-900">
                          Email Verified
                        </h2>
                        <p className="mt-2 text-center text-md text-gray-600 mb-8">
                          Your email address has been successfully verified.
                        </p>
                        <Link className='bg-green-500 text-white hover:bg-green-400 px-7  py-3 rounded-lg' to='/login'>Login</Link>
                      </div>
                    </div>
                  </div>
                ) : <>
                     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="text-center">
              <i className="mx-auto h-12 w-auto text-yellow-400 text-5xl fas fa-exclamation-triangle" aria-hidden="true"></i>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-green-900">
                  404 Not Found
                </h2>
                <p className="mt-2 text-center text-md text-gray-600 mb-8">
                Sorry, the page you are looking for could not be found.
                </p>
                <Link className='bg-yellow-500 text-white hover:bg-yellow-400 px-7  py-3 rounded-lg' to='/'>Go Back</Link>
              </div>
            </div>
          </div>
                    </>
            }
        
            </>
        }
   </>
  )
}


export default Verify
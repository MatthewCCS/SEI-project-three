import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

import { userIsAuthenticated } from '../helpers/auth.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { FaStar } from 'react-icons/fa'


const GetOneRestaurant = () => { 

  const navigate = useNavigate()

  const { id, restaurantId } = useParams()

  const [ city, setCity ] = useState([])
  const [ restaurant, setRestaurant ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => { 
    const getRestaurant = async () => {
      try {
        const { data } = await axios.get(`/api/cities/${id}/restaurants/${restaurantId}`)
        console.log(data)
        setRestaurant(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getRestaurant()
  }, [restaurantId])


  return (
    <Container className='mt-3'>
      <Row>
        { restaurant ? 
          <>
            <Col xs='12'><h1>{restaurant.name}</h1><hr/></Col>
            <Col md='6'>
              <img src={restaurant.image} alt={restaurant.name} />
            </Col>
            <Col md='6'>
              <h3><span>🤤</span> Description </h3>
              <p>{restaurant.description}</p>
              <hr />
              <Link to={`/cities/${id}`} className='btn btn-secondary mt-3 ' style={{ marginRight: '1.5rem' }}>Back to List</Link>
              {userIsAuthenticated() ? 
                <Link className='btn btn-success mt-3' to={`/cities/${id}/restaurants/${restaurantId}/review`}>Add Review</Link>
                :
                <Link className='btn btn-success mt-3' to={'/login'}>Add Review</Link>
              }
              <ul>
                {restaurant.reviews.map((review, n) => {
                  return <li key={n}>
                    {/* <Link to={`/user/${review.owner._id}`}> */}
                    <div className="reviewHeader">
                      <p><strong>By {review.owner.username}</strong></p>
                    </div>
                    {/* <FaStar rating={review.rating} /> */}
                    <p>{review.text}</p>
                    {review.image &&
                      <img src={review.image} className='reviewImage' alt="users attempt" />
                    }
                    {/* </Link> */}
                  </li>
                })}
              </ul>
            </Col>
          </>
          :
          <h2 className='text-center'>
            {errors ? 'No Restaurant In Here :(' : 'Looking 👀...'}
          </h2>
        }
      </Row>
    </Container>
  )
}

export default GetOneRestaurant

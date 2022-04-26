import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Buttion, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const CartScreen = () => {

    const dispatch = useDispatch()

    const { id } = useParams()
    let location = useLocation();
    const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1

    const cart = useSelector((state) => {
        return state.cart
    })

    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                <Message>Your cart is empty<Link to='/'>Go Back</Link>
                </Message>
                ) : (
                    <ListGroup variant='flush'></ListGroup>
                )}
            </Col>
            <Col md={2}>

            </Col>
            <Col md={2}>

            </Col>
        </Row>
    )


}

export default CartScreen


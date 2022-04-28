import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, PageItem } from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = () => {

    const { id } = useParams()
    let navigate = useNavigate()

    const location = useLocation();
    const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => {
        return state.cart
    })
    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
        
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
         navigate('login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your cart is empty<Link to='/'>Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (                               // => use parenthesis ( )
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal (
                                {cartItems.reduce((acc, item) => {
                                let totalItemsInCart = acc + item.qty
                                return totalItemsInCart
                            }, 0)}
                                ) items
                            </h2>
                            ${cartItems.reduce((acc, item) => {
                                let totalAmount = acc + (item.price * item.qty)
                                return totalAmount
                            }, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )


}

export default CartScreen


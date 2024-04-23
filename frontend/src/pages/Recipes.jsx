import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, InputGroup, FormControl, Button, Card} from 'react-bootstrap';

const Recipes = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [fridgeItems, setFridgeItems] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('usedIngredientCount');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchFridgeItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/fridgeItems', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFridgeItems(response.data);
                const defaultSearchIngredients = response.data.map(item => item.name).join(',');
                handleSearch(defaultSearchIngredients);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFridgeItems();
    }, []);

    const handleSort = (criteria) => {
        if (criteria === sortCriteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const sortedRecipes = recipes.sort((a, b) => {
        const aValue = a[sortCriteria];
        const bValue = b[sortCriteria];

        if (sortOrder === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    const handleSearch = async (searchIngredients) => {
        try {
            const response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', {
                params: {
                    ingredients: searchIngredients,
                    number: '25',
                    ignorePantry: 'true',
                    ranking: '1',
                },
                headers: {
                    'X-RapidAPI-Key': 'ebc16a25f3mshed55b0ebde53939p1c4784jsnb35adfafdb2e',
                    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                },
            });

            setRecipes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Enter ingredients..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => handleSearch(ingredients)}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Sort By:</InputGroup.Text>
                        <Button
                            variant={`info ${sortCriteria === 'usedIngredientCount' ? 'active' : ''}`}
                            onClick={() => handleSort('usedIngredientCount')}
                        >
                            Used
                        </Button>
                        <Button
                            variant={`info ${sortCriteria === 'missedIngredientCount' ? 'active' : ''}`}
                            onClick={() => handleSort('missedIngredientCount')}
                        >
                            Missed
                        </Button>
                        <Button
                            variant={`info ${sortCriteria === 'likes' ? 'active' : ''}`}
                            onClick={() => handleSort('likes')}
                        >
                            Likes
                        </Button>
                        <Button
                            variant={`info ${sortOrder === 'asc' ? 'active' : ''}`}
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {sortedRecipes.map((recipe) => (
                    <Col key={recipe.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={recipe.image} alt={recipe.title}/>
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Text>
                                    Used Ingredient Count: {recipe.usedIngredientCount} <br/>
                                    Missed Ingredient Count: {recipe.missedIngredientCount} <br/>
                                    Likes: {recipe.likes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Recipes;

import React, {useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, InputGroup, FormControl, Button, Card} from 'react-bootstrap';

const Recipes = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients', {
                params: {
                    ingredients,
                    number: '5',
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
        <Container>
            <Row className="mt-4">
                <Col md={12}>
                    <InputGroup className="mb-3" style={{marginTop: '5vh'}}>
                        <FormControl
                            placeholder="Enter ingredients..."
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button variant="outline-secondary" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {recipes.map((recipe) => (
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

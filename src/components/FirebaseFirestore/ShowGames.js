import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPenNib } from "@fortawesome/free-solid-svg-icons";
import firebase from '../../Firebase/firebase'

const ShowGames = ({ games }) => {
  const getFormattedTitle = (name) => {
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return nameCapitalized;
  };

  //delete game
  const deleteGame = async (game) => {
    await firebase.firestore().collection('games').doc(game.id).delete();
    firebase.storage().refFromURL(game.imageUrl).delete().then((res)=>{
      console.info('Deletion image res::', res);
      alert('Success: Game is deleted');
    }).catch((error) =>{
      console.error('Error::', error);
    });
    
  }

  const getGamesCards = games.map((game) => {
    //return <p key={game.id}>{game.name}</p>;

    return (
      <Col md="4" key={game.id}>
        <Card>
          <CardImg top width="100%" src={game.imageUrl} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">{getFormattedTitle(game.name)}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              <p>{game.launchDate.toString()}</p>
            </CardSubtitle>
            <CardText>
              <span>{game.description}</span>
            </CardText>
            <div>
              <span className="btnGroup">
                <button className="viewBtn" style={{marginRight: '5px'}}>
                  <FontAwesomeIcon icon={faPenNib} />
                </button>
                <button className="viewBtn" id="deleteBtn" style={{marginLeft: '5px'}} onClick={() => {deleteGame(game)}}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  });


  return (
    <div>
      <h1>Show Games</h1>
      <Container>
        {games.length === 0 && (
          <Row>
            <p>There are no games in db</p>
          </Row>
        )}
        {games.length > 0 && <Row>{getGamesCards}</Row>}
      </Container>
    </div>
  );
};

export default ShowGames;

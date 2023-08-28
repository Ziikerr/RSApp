import axios from "axios";
import { useMemo, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

//Displays all comments for a particular RSP

function CommentsBlock() {
  const params = useParams();
  const [commentInfo, setCommentInfo] = useState([]);
  useMemo(() => {
    const rspID = {
      rspID: params.id,
    };
    axios
      .post("http://localhost:8800/review/get", rspID)
      .then((res) => {
        setCommentInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {commentInfo.length > 0 && <h3>Comments about this RSP</h3>}
      <Container fluid className="d-flex mt-2">
        <Row>
          {commentInfo.map(
            (item: { reviewID: number; user: string; comment: string }) => (
              <Card
                key={item.reviewID}
                style={{ width: "18rem" }}
                className="m-2"
              >
                <Card.Body>
                  <Card.Title>{item.user}</Card.Title>
                  <Card.Text>{item.comment}</Card.Text>
                </Card.Body>
              </Card>
            )
          )}
        </Row>
      </Container>
    </>
  );
}

export default CommentsBlock;

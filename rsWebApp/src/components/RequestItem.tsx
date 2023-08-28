import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  userName: string;
  userLastName: string;
}

//Individual request element, used in RequestsPage
function RequestItem({ id, userName, userLastName }: Props) {
  return (
    <Container>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className=" me-auto">
          <Link
            className="fw-bold text-dark text-decoration-none"
            to={"/Requests/" + id}
          >
            {"Request from: " + userName + " " + userLastName}
          </Link>
        </div>
      </ListGroup.Item>
    </Container>
  );
}
export default RequestItem;

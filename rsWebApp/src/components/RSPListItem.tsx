import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  rspName: string;
  rating: number;
  price: number;
}

function RSPListItem({ id, rspName, rating, price }: Props) {
  function badgeColor(check: number) {
    if (check >= 4) return "success";
    else if (check <= 2) return "danger";
    return "warning";
  }
  return (
    <Container>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className=" me-auto">
          <Link
            className="fw-bold text-dark text-decoration-none"
            to={"/RSP/" + id}
          >
            {rspName}
          </Link>
        </div>
        <div className="mx-3">
          {"Rating: "}
          <Badge bg={badgeColor(rating)}>
            {Math.round(rating * 100) / 100 + "/5"}
          </Badge>
        </div>
        <div className="mx-3">
          {"Price: "}
          <Badge bg={badgeColor(price)}>
            {Math.round(price * 100) / 100 + "/5"}
          </Badge>
        </div>
      </ListGroup.Item>
    </Container>
  );
}

export default RSPListItem;

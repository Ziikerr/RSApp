import "./List.css";
import { Container, ListGroup } from "react-bootstrap";
import RSPListItem from "./RSPListItem";
import { useEffect, useState } from "react";
import axios from "axios";

function RSPList() {
  const [rsps, setRsps] = useState([]);
  useEffect(() => {
      axios
        .get("http://localhost:8800/RSP")
        .then((res) => {
          setRsps(res.data);
        })
        .catch((err) => console.log(err));
  }, []);
  return (
    <Container fluid className="list234">
      <ListGroup as="ol">
        {rsps.map(
          (item: {
            rspID: number;
            companyName: string;
            rating: number;
            pricingRating: number;
          }) => (
            <RSPListItem
              key={item.rspID}
              id={item.rspID}
              rspName={item.companyName}
              rating={item.rating}
              price={item.pricingRating}
            />
          )
        )}
      </ListGroup>
    </Container>
  );
}

export default RSPList;

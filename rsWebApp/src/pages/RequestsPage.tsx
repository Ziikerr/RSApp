import { useEffect, useState } from "react";
import PageText from "../components/PageText";
import { Container, ListGroup } from "react-bootstrap";
import RequestItem from "../components/RequestItem";
import { getCookie } from "typescript-cookie";
import axios from "axios";

//Displays requests to RSP
function RequestsPage() {
  const [requests, setRequests] = useState([]);

  //Load data to populate individual elements
  useEffect(() => {
    const rspID = {
      rspID: getCookie("RSP-cookie"),
    };
    axios
      .post("http://localhost:8800/requests/get", rspID)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <PageText title="Current requests" align="text-center" />
      <Container fluid className="list234">
        <ListGroup as="ol">
          {requests.map(
            (item: {
              requestID: number;
              userID: number;
              userName: string;
              userLastName: string;
            }) => (
              <RequestItem
                key={
                  item.userID +
                  "u" +
                  getCookie("RSP-cookie") +
                  "r" +
                  item.requestID
                }
                id={
                  item.userID +
                  "u" +
                  getCookie("RSP-cookie") +
                  "r" +
                  item.requestID
                }
                userName={item.userName}
                userLastName={item.userLastName}
              />
            )
          )}
        </ListGroup>
      </Container>
    </>
  );
}

export default RequestsPage;

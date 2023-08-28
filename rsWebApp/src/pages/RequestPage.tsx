import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import Chat from "../components/Chat";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import axios from "axios";
import ReviewModal from "../components/ReviewModal";
import { io } from "socket.io-client";

const socket = io("http://localhost:8800", {
  autoConnect: false,
});

//Page of an individual service request, accessible by both RSP and user
function RequestPage() {
  const params = useParams();
  const [user, setUser] = useState(false);
  const [rsp, setRSP] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [rspID, setRSPID] = useState();
  const [requestID, setRequestID] = useState();
  const [description, setdescription] = useState();
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState(params.id);

  useMemo(() => {
    //Sets user/RSP flags to display/hide parts of the page
    {
      getCookie("UID-cookie") && setUser(true);
    }
    {
      getCookie("RSP-cookie") && setRSP(true);
    }
    //Requests the data from the server
    const sendData = {
      id: params.id,
    };

    axios
      .post("http://localhost:8800/requests/getONE", sendData)
      .then((res) => {
        setRSPID(res.data.rspID);
        setRequestID(res.data.requestID);
        setdescription(res.data.description);
        setRequestCompleted(res.data.completed);
      })
      .catch((err) => console.log(err));
  }, []);
  //socket io connection
  useEffect(() => {
    socket.connect();
    function onConnect() {
      if (room !== "") socket.emit("join_room", room);
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  //updates the status of request
  useMemo(() => {
    function rComplete() {
      setRequestCompleted(true);
    }
    socket.on("request_completed", rComplete);
  }, [socket]);

  //used by RSP to mark request as completed
  async function completeRequest() {
    const reqData = {
      requestID: requestID,
      room: room,
    };
    axios
      .post("http://localhost:8800/requests/complete", reqData)
      .then(() => {
        setRequestCompleted(true);
      })
      .catch((err) => console.log(err));
    await socket.emit("complete_request", reqData);
  }

  function passSetShow() {
    setShow(false);
    return show;
  }

  if (!user && !rsp) return <div>Not logged in</div>;
  return (
    <>
      <Modal show={show}>
        <ReviewModal onCancel={passSetShow} rspID={rspID} />
      </Modal>
      <Container fluid className="text-start">
        <Row>
          <Col className="text-center">
            <Row className="text-start">
              <Col>
                Status:{" "}
                {requestCompleted
                  ? "Request completed"
                  : "Request not completed"}
              </Col>
            </Row>
            <Row className="text-start">
              <Col>Description:{" " + description}</Col>
            </Row>
          </Col>

          <Col className="text-center">
            <h3>Chat</h3>
            <Row>
              <Col>
                <Chat socket={socket}></Chat>
              </Col>
              {/*Button only shows to RSP when request is not completed*/}
              {rsp ? (
                !requestCompleted ? (
                  <Button className="mt-2" onClick={() => completeRequest()}>
                    Complete request
                  </Button>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}
              {/*Button only shows to user when request is completed, bring up modal with a review form*/}
              {user ? (
                requestCompleted ? (
                  <Button className="mt-2" onClick={() => setShow(true)}>
                    Leave a review
                  </Button>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RequestPage;

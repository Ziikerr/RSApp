import { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { getCookie } from "typescript-cookie";
import "./Chat.css";

interface Props {
  socket: Socket;
}

//Provides live chat functionality between user and repair service provider
//Messages aren't saved to the database

function Chat({ socket }: Props) {
  const params = useParams();

  const [room, setRoom] = useState(params.id);
  const [connected, setConnected] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [mList, setMList] = useState<
    { room: number; uID: string; rsID: string; message: string }[] | any[]
  >([]);
  const userID = getCookie("UID-cookie");
  const rspID = getCookie("RSP-cookie");

  //Reconnect to a chat room
  function connect() {
    if (room !== "") socket.emit("join_room", room);
    setConnected(true);
  }

  //Update message list when a new message is received
  useMemo(() => {
    socket.on("receive_message", (data) => {
      setMList((prevmList) => [...prevmList, data]);
    });
  }, [socket]);

  //Send a message to the server
  async function sendMessage() {
    if (currentMessage !== "") {
      const mData = {
        room: room,
        uID: userID,
        rsID: rspID,
        message: currentMessage,
      };

      await socket.emit("send_message", mData);
      setMList((list) => [...list, mData]);
    }
  }

  return (
    <Container className="mx-auto px-4">
      <Row className="mx-2 chatbox border rounded-2">
        <Container fluid className="px-1">
          {mList.map((data, index) => {
            let selfMsg = false;
            let clName = "";
            //Determine whether a message has been sent or received
            {
              data.rsID === rspID
                ? (selfMsg = true)
                : data.uID === userID
                ? (selfMsg = true)
                : (selfMsg = false);
            }
            //Assign className value so that sent messages display on the left, while received display on the right
            {
              selfMsg ? (clName = "text-start") : (clName = "text-end");
            }

            return (
              <Container fluid key={index} className={"my-1 " + clName}>
                <Row className={clName}>
                  <h6>{data.message}</h6>
                </Row>
              </Container>
            );
          })}
        </Container>
      </Row>

      <Container className="px-2 text-center mt-2">
        <Row>
          <Col>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Write a message here"
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
            />
          </Col>
          <Col className="text-end" md="auto">
            {!connected ? (
              <Button onClick={connect}>Reconnect to chat</Button>
            ) : (
              <Button onClick={sendMessage}>Send</Button>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Chat;

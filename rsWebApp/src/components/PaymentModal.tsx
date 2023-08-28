import axios from "axios";
import { FormEvent, createRef } from "react";
import { Modal, Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  onCancel: () => {};
  requestData: {
    userID: string | undefined;
    rspID: string | undefined;
  };
}

//Modal for processing payment (only visual representation of a process right now)
//Additionally adds a repair request entry in the database

function PaymentModal({ onCancel, requestData }: Props) {
  const descriptionRef = createRef<HTMLTextAreaElement>();
  const cvvRef = createRef<HTMLInputElement>();
  const cardNumRef = createRef<HTMLInputElement>();

  const navigate = useNavigate();

  function addRequest() {
    const description = descriptionRef.current?.value;
    const data = {
      userID: requestData.userID,
      rspID: requestData.rspID,
      description: description,
    };

    /*
    onCancel;
    navigate(
          "/requests/" +
            data.userID +
            "u" +
            data.rspID +
            "r" +
            res.data.requestID
        );

    */
    //Send request data to server
    console.log("sending data");
    axios
      .post("http://localhost:8800/requests/add", data)
      .then(() => {
        axios
          .post("http://localhost:8800/requests/add2", data)
          .then((res) => {
            console.log(res.data);
            onCancel;
            navigate(
              "/requests/" +
                data.userID +
                "u" +
                data.rspID +
                "r" +
                res.data.requestID
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    addRequest();
    //Payment related things would happen here
  }

  //check max length for number type fields
  function maxLengthCheck(ref: React.RefObject<HTMLInputElement>) {
    if (ref.current) {
      const maxL = ref.current.maxLength;
      const curL = ref.current.value.length;
      if (curL > maxL) ref.current.value = ref.current.value.slice(0, maxL);
    }
  }

  return (
    <>
      <Modal.Header closeButton onClick={onCancel}>
        <Modal.Title>{"Enter credit card info"}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Container>
            <Row>
              <Form.Control
                ref={cardNumRef}
                type="number"
                placeholder="1234 1234 1234 1234"
                className="mb-3"
                onChange={() => maxLengthCheck(cardNumRef)}
                maxLength={16}
              />
            </Row>
            <Row>
              <Form.Control
                type="text"
                placeholder="Name on card"
                className="mb-3"
              />
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Expiration Date"
                  type="month"
                  className="mb-3"
                />
              </Col>
              <Col>
                <Form.Control
                  ref={cvvRef}
                  placeholder="CVV"
                  type="number"
                  className="mb-3"
                  onChange={() => maxLengthCheck(cvvRef)}
                  maxLength={3}
                />
              </Col>
              <Row>
                <Form.Label>Enter description of your problem</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ resize: "none" }}
                  ref={descriptionRef}
                  placeholder="Describe your problem"
                  className="mb-3"
                  rows={3}
                />
              </Row>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default PaymentModal;

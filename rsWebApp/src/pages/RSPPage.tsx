import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import CommentsBlock from "../components/CommentsBlock";
import PaymentModal from "../components/PaymentModal";

interface rspInfo {
  firstName: "";
  lastName: "";
  email: "";
  address: "";
  companyName: "";
  phoneNumber: "";
  minPrice: "";
  description: "";
}

//Shows info about an RSP, allows users to request service from an RSP

function RSPPage() {
  const params = useParams();
  const [rspInfo, setRSPInfo] = useState<rspInfo>();
  const [show, setShow] = useState(false);

  const rspID = params.id;
  const orderData = {
    userID: getCookie("UID-cookie"),
    rspID: rspID,
  };

  //fetches data about RSP on load
  useEffect(() => {
    const rspID = {
      rspID: params.id,
    };
    axios
      .post("http://localhost:8800/rsp/get", rspID)
      .then((res) => {
        setRSPInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Passing setShow to close the Modal
  function passSetShow() {
    setShow(false);
    return show;
  }

  return (
    <>
      <Modal show={show}>
        <PaymentModal onCancel={passSetShow} requestData={orderData} />
      </Modal>
      <Container fluid className="text-start">
        <Row>
          <Col className="text-center">
            <h3>Info</h3>
            <Row className="text-start">
              <Col>
                {rspInfo?.description
                  ? rspInfo?.description
                  : "No description left by the RSP"}
              </Col>
            </Row>
          </Col>
          {/*Only display request service button if authenticated as a user*/}
          {getCookie("UID-cookie") && (
            <Button className="mt-2" onClick={() => setShow(true)}>
              Request service
            </Button>
          )}

          <Row className="text-start mt-2">
            <Col>
              <h5>Phone number:</h5> {rspInfo?.phoneNumber}
            </Col>
          </Row>
          <Row className="text-start mt-2">
            <Col>
              <h5>Address:</h5> {rspInfo?.address}
            </Col>
          </Row>
        </Row>
        <Row className="text-center">
          <CommentsBlock />
        </Row>
      </Container>
    </>
  );
}

export default RSPPage;

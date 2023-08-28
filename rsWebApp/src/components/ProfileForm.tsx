import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getCookie } from "typescript-cookie";

interface Props {
  rsp: boolean;
}

interface uInfo {
  firstName: "";
  lastName: "";
  email: "";
  address: "";
}

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

function ProfileForm({ rsp }: Props) {
  const [isUpdate, setUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState<uInfo>();
  const [rspInfo, setRSPInfo] = useState<rspInfo>();

  const fNameInputRef = useRef<HTMLInputElement>(null);
  const lNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const cnameInputRef = useRef<HTMLInputElement>(null);
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const phoneNumInputRef = useRef<HTMLInputElement>(null);
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  //Load existing data from the database (user/RSP variants)
  useEffect(() => {
    if (!rsp) {
      const userID = {
        userID: getCookie("UID-cookie"),
      };
      axios
        .post("http://localhost:8800/users/get", userID)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      const rspID = {
        rspID: getCookie("RSP-cookie"),
      };
      axios
        .post("http://localhost:8800/rsp/get", rspID)
        .then((res) => {
          setRSPInfo(res.data);
          console.log(rspInfo);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //Send new profile data to server
  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredCName = cnameInputRef.current?.value;
    const enteredMinPrice = minPriceInputRef.current?.value;
    const enteredPhoneNum = phoneNumInputRef.current?.value;
    const enteredDescription = descInputRef.current?.value;

    const updateData = {
      userID: getCookie("UID-cookie"),
      rspID: getCookie("RSP-cookie"),
      email: enteredEmail,
      password: enteredPassword,
      address: enteredAddress,
      cName: enteredCName,
      minPrice: enteredMinPrice,
      phoneNum: enteredPhoneNum,
      description: enteredDescription,
    };

    if (!rsp) {
      axios
        .post("http://localhost:8800/users/UPDATE", updateData, {})
        .then(() => {
          setUpdate(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8800/RSP/UPDATE", updateData)
        .then(() => {
          setUpdate(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <Form onSubmit={submitHandler} className="px-2 mx-3">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            ref={fNameInputRef}
            required
            placeholder={
              userInfo?.firstName ? userInfo?.firstName : rspInfo?.firstName
            }
            disabled
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            ref={lNameInputRef}
            required
            placeholder={
              userInfo?.lastName ? userInfo?.lastName : rspInfo?.lastName
            }
            disabled
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={emailInputRef}
            required
            type="email"
            placeholder={
              !isUpdate
                ? userInfo?.email
                  ? userInfo?.email
                  : rspInfo?.email
                : "Email"
            }
            disabled={!isUpdate}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInputRef}
            required
            type="password"
            placeholder="*******"
            disabled={!isUpdate}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          ref={addressInputRef}
          required
          placeholder={
            !isUpdate
              ? userInfo?.address
                ? userInfo?.address
                : rspInfo?.address
              : "Address"
          }
          disabled={!isUpdate}
        />
      </Form.Group>
      {rsp && (
        <>
          <Form.Group className="mb-3" controlId="formGridcName">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              ref={cnameInputRef}
              required={rsp}
              placeholder={!isUpdate ? rspInfo?.companyName : "Company name"}
              disabled={!isUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridMinPrice">
            <Form.Label>Minimum service price</Form.Label>
            <Form.Control
              ref={minPriceInputRef}
              required={rsp}
              placeholder={
                !isUpdate ? rspInfo?.minPrice : "Minimum service price"
              }
              disabled={!isUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridPhoneNum">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              ref={phoneNumInputRef}
              required={rsp}
              placeholder={!isUpdate ? rspInfo?.phoneNumber : "Phone number"}
              disabled={!isUpdate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              ref={descInputRef}
              required={rsp}
              placeholder={
                !isUpdate ? rspInfo?.description : "Write a description here"
              }
              disabled={!isUpdate}
            />
          </Form.Group>
        </>
      )}
      <div className="text-end">
        {!isUpdate ? (
          <Button
            className="w-100 mb-3"
            variant="primary"
            onClick={() => setUpdate(!isUpdate)}
          >
            Edit profile
          </Button>
        ) : (
          <Button className="w-100 mb-3 " variant="primary" type="submit">
            Apply changes
          </Button>
        )}
      </div>
    </Form>
  );
}
export default ProfileForm;

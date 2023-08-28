import axios from "axios";
import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  rsp: boolean;
}

function RegistrationForm({ rsp }: Props) {
  const fNameInputRef = useRef<HTMLInputElement>(null);
  const lNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const cnameInputRef = useRef<HTMLInputElement>(null);
  const minPriceInputRef = useRef<HTMLInputElement>(null);
  const phoneNumInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredFName = fNameInputRef.current?.value;
    const enteredLName = lNameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredCName = cnameInputRef.current?.value;
    const enteredMinPrice = minPriceInputRef.current?.value;
    const enteredPhoneNum = phoneNumInputRef.current?.value;

    const regData = {
      firstName: enteredFName,
      lastName: enteredLName,
      email: enteredEmail,
      password: enteredPassword,
      address: enteredAddress,
      cName: enteredCName,
      phoneNum: enteredPhoneNum,
      minPrice: enteredMinPrice,
    };

    //Sending the registration data to the backend server
    if (!rsp) {
      axios
        .post("http://localhost:8800/users", regData)
        .then((res) => {
          console.log(res);
          return navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8800/RSP", regData)
        .then((res) => {
          console.log(res);
          return navigate("/");
        })
        .catch((err) => console.log(err));
    }
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
    <Form onSubmit={submitHandler} className="px-2 mx-sm-3">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>First Name</Form.Label>
          <Form.Control ref={fNameInputRef} required placeholder="First Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control ref={lNameInputRef} required placeholder="Last Name" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={emailInputRef}
            required
            maxLength={20}
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInputRef}
            required
            maxLength={20}
            type="password"
            placeholder="*******"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control ref={addressInputRef} required placeholder="Address" />
      </Form.Group>
      {/*Addittional fields if a user is registering as an RSP */}
      {rsp && (
        <>
          <Form.Group className="mb-3" controlId="formGridcName">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              ref={cnameInputRef}
              required={rsp}
              placeholder="Company name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridMinPrice">
            <Form.Label>Minimum service price</Form.Label>
            <Form.Control
              ref={minPriceInputRef}
              required={rsp}
              type="number"
              onChange={() => maxLengthCheck(minPriceInputRef)}
              maxLength={2}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGridPhoneNum">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              ref={phoneNumInputRef}
              required={rsp}
              type="number"
              onChange={() => maxLengthCheck(phoneNumInputRef)}
              maxLength={15}
              placeholder="Phone Number"
            />
          </Form.Group>
        </>
      )}
      <div className="text-end">
        <Button className="w-100 mb-3 " variant="primary" type="submit">
          Complete Registration
        </Button>
      </div>
    </Form>
  );
}
export default RegistrationForm;

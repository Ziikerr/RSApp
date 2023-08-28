import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { setCookie } from "typescript-cookie";

interface Props {
  title: string;
  btnAction: () => void;
  onLogin: () => void;
}

//Used to login

function LoginModal({ title, onLogin, btnAction }: Props) {
  const [show, setShow] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    //Send a login request to the server
    //First requests performs a search in the users table
    //If not successful, second request performs a search in RSP table
    //Displays an alert if login is no successfull
    axios
      .post("http://localhost:8800/login", loginData, { withCredentials: true })
      .then((res) => {
        if (res.data === 402) {
          //Request to the RSP table
          axios
            .post("http://localhost:8800/login2", loginData, {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data === 402) {
                alert("Wrong credentials");
              } else {
                setShow(false);
                console.log(res.data);
                setCookie("auth-cookie", res.data.accessToken);
                setCookie("RSP-cookie", res.data.rspID);
                onLogin();
              }
            })
            .catch((err) => console.log(err));
        } else {
          setShow(false);
          console.log(res.data);
          setCookie("auth-cookie", res.data.accessToken);
          setCookie("UID-cookie", res.data.userID);
          onLogin();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal show={show} onHide={btnAction}>
      <Modal.Header closeButton onClick={btnAction}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Enter email:</Form.Label>
            <Form.Control
              ref={emailInputRef}
              type="email"
              placeholder="Email"
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPass">
            <Form.Label>Enter password:</Form.Label>
            <Form.Control
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button href="/register" variant="outline">
            Register
          </Button>
          <Button variant="secondary" onClick={btnAction}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default LoginModal;

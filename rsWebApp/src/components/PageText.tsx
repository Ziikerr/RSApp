import { Col, Container, Row } from "react-bootstrap";

interface Props {
  align?: string;
  title?: string;
  text?: string;
}

function PageText({ title, text, align = "text-center" }: Props) {
  return (
    <Container fluid className={align}>
      <Row className="justify-content-start">
        <Col>{title != "" && <h1 className="display-3">{title}</h1>}</Col>
      </Row>
      <Row>
        <Col>{text != "" && <p className="lead">{text}</p>}</Col>
      </Row>
    </Container>
  );
}

export default PageText;

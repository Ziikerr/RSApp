import { Card } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm";

interface Props {
  isRSP: boolean;
}

function RegPage({ isRSP }: Props) {
  return (
    <>
      <h1>{isRSP ? "Service provider registration" : "Registration"}</h1>
      <div className="justify-content-center px-sm-5">
        <Card className="text-center mb-2 pt-2">
          <RegistrationForm rsp={isRSP} />
        </Card>
      </div>
    </>
  );
}

export default RegPage;

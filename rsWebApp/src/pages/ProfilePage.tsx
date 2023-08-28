import { Card, Container } from "react-bootstrap";
import ProfileForm from "../components/ProfileForm";
import { getCookie } from "typescript-cookie";
import { useState } from "react";

function ProfilePage() {
  const [isRSP, setRSP] = useState(getCookie("RSP-cookie") ? true : false);
  return (
    <Container>
      <Card>
        <ProfileForm rsp={isRSP} />
      </Card>
    </Container>
  );
}

export default ProfilePage;

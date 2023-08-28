import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link className="text-dark text-decoration-none" to={"/registerRSP"}>
        Register as repair service provider
      </Link>
    </footer>
  );
}

export default Footer;

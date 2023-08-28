import PageText from "../components/PageText";
import RSPList from "../components/RSPList";

const serviceText = "Available repair service providers:";

function ServicesPage() {
  return (
    <>
      <PageText title={serviceText} align="text-start" />
      <RSPList />
    </>
  );
}

export default ServicesPage;

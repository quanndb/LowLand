import { Helmet } from "react-helmet-async";

import ContactView from "src/sections/contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | LowLand</title>
      </Helmet>

      <ContactView />
    </>
  );
};

export default ContactPage;

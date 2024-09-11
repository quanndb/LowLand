import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container } from "@mui/material";

const FloatInOnScroll = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container maxWidth={"100%"} disableGutters>
      <motion.div
        ref={ref}
        initial={{ y: 100, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </motion.div>
    </Container>
  );
};

export default FloatInOnScroll;

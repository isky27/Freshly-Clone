import React from "react";
import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../redux/userLogin/userLogin.action";

const Navbar = () => {
  const { isAuth } = useSelector((store) => store.userLogin);
  const dispatch = useDispatch();

  return (
    <Grid
      p="10px"
      mt="10px"
      templateColumns={{ base: "repeat(1, 1fr)", md: "1fr 2fr 1fr" }}
      alignItems="center"
      bg="#FFFDF7"
    >
      <GridItem w="150px" h="10" justifySelf={{ base: "center", md: "left" }}>
        <Image src="https://user-images.githubusercontent.com/96005514/200733048-13b7c9b1-a830-4bff-97a8-84f50f4ab359.png" />
      </GridItem>
      <GridItem w="100%">
        <Flex
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Link style={{ padding: "5px" }} to="/">
            <Text fontSize={{ base: "m", lg: "xl" }}>Home</Text>
          </Link>
          <Link style={{ padding: "5px" }} to="/products">
            <Text fontSize={{ base: "m", lg: "xl" }}>Plan & Meal</Text>
          </Link>
          <Link style={{ padding: "5px" }} to="/about">
            <Text fontSize={{ base: "m", lg: "xl" }}>How it Works</Text>
          </Link>
          <Link style={{ padding: "5px" }} to="/gift">
            <Text fontSize={{ base: "m", lg: "xl" }}>Gifts</Text>
          </Link>
          <Link style={{ padding: "5px" }} to="/contact">
            <Text fontSize={{ base: "m", lg: "xl" }}>Contact</Text>
          </Link>
        </Flex>
      </GridItem>
      <Flex justifyContent={{ base: "center", md: "flex-end" }}>
        {!isAuth ? (
          <>
            <Link to="/login">
              <Button m="0px 10px">Login</Button>
            </Link>
            <Link to="/signup">
              <Button m="0px 10px" bg="#3167FF" colorScheme="white">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button m="0px 10px">Welcome</Button>
            <Button
              onClick={() => {
                dispatch(userLogout());
              }}
              m="0px 10px"
              bg="#3167FF"
              colorScheme="white"
            >
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Grid>
  );
};

export default Navbar;

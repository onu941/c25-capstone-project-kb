import { Center, Container, Flex, MantineProvider, Text } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container fluid style={{ height: "100%" }}>
        <Center>Text</Center>
      </Container>
    </MantineProvider>
  );
}

import type { Route } from "./+types/home";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Link,
  Section,
  Slider,
  Tabs,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import WebNav from "~/components/web-nav";
import WebFooter from "~/components/web-footer";
import { Form, Label } from "radix-ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Support - invo.dev" },
    { name: "description", content: "Get support for Invo.dev" },
  ];
}

export default function Supports() {
  return (
    <div className="page-wrapper">
      <div className="py-4 flex justify-center border-b-2 border-dashed border-neutral-300">
        <p>
          <strong>Invo.dev is live!</strong>
        </p>
      </div>

      <Section className="max-sm:!pb-0">
        <Container>
          <WebNav />
        </Container>
      </Section>

      <Section className="!pt-0 !pb-0">
        <Container>
          <h1 className="text-4xl leading-none font-medium mb-4 max-sm:text-2xl">
            Need Support?
          </h1>
          <Box className="max-w-2xl mb-4">
            <Text mb={"4"}>
              For bug reports and feature requests, please email us at{" "}
              <Link href="mailto:support@invo.dev">support@invo.dev</Link> or
              drop a message below.
            </Text>
          </Box>
        </Container>
      </Section>

      {/* <Section className="!pt-0 max-sm:!pb-0">
        <Container>
          <Form.Form className="invoice-settings flex !gap-6 max-lg:flex-col max-lg:items-center">
            <Box className="flex pt-4 pb-4 items-stretch flex-none w-full max-w-[480px] relative">
              <Flex direction="column" gap="0" className="max-h-full">
                <Flex direction="column" gap="4">
                  <TextField.Root
                    name="contact-name"
                    placeholder="Your name"
                    size="3"
                  ></TextField.Root>
                  <TextField.Root
                    name="contact-email"
                    placeholder="Your email"
                    size="3"
                  ></TextField.Root>
                  <TextArea size="3" placeholder="Your message" />
                  <Box>
                    <Button size="4" type="submit">
                      Send Message
                    </Button>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Form.Form>
        </Container>
      </Section> */}

      <Section>
        <Container>
          <WebFooter />
        </Container>
      </Section>
    </div>
  );
}

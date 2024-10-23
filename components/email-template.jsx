import * as React from "react";
import { Button, Html } from "@react-email/components";
import { Section, Img, Text, Heading } from "@react-email/components";

export const EmailTemplate = ({ firstName }) => (
  <Section className="my-[16px]">
    {/* First Image */}
    <Img
      alt="Futuristic Mobile Commerce"
      className="w-full rounded-[12px] object-cover"
      height={320}
      src="https://img.freepik.com/premium-photo/scifi-inspired-visualization-impact-mobile-commerce-ecommerce-sales-virtual-hand_216520-90098.jpg"
    />
    <Section className="mt-[32px] text-center">
      <Text className="mt-[16px] text-[18px] font-semibold leading-[28px] text-indigo-600">
        Sci-Fi E-Commerce Experience
      </Text>
      <Heading
        as="h1"
        className="text-[36px] font-semibold leading-[40px] tracking-[0.4px] text-gray-900"
      >
        Explore the Future of Online Shopping
      </Heading>
      <Text className="mt-[8px] text-[16px] leading-[24px] text-gray-500">
        Step into a new era of shopping, where futuristic products meet seamless
        online experience.
      </Text>
      <Text className="text-[16px] font-semibold leading-[24px] text-gray-900">
        Starting at $210.00
      </Text>
      {/* Button replaced with your provided image */}
      <Img
        className="mt-[16px] rounded-[8px] object-cover"
        src="https://st3.depositphotos.com/29384342/50413/i/450/depositphotos_504135226-stock-photo-glowing-sci-tunnel-corridor-abstract.jpg"
        alt="Explore Now"
        width="300"
        height="300"
      />
      <Button
        className="mt-[16px] rounded-[8px] bg-indigo-600 px-[24px] py-[12px] font-semibold text-white"
        href="https://react.email"
      >
        Explore Now
      </Button>
    </Section>
  </Section>
);

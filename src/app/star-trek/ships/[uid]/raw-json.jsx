"use client";

import Accordion from "@/components/accordion";

export const RawJSON = ({ info }) => (
  <Accordion>
    <Accordion.Header>Raw API JSON</Accordion.Header>
    <Accordion.Content className="p-2">
      {JSON.stringify(info)}
    </Accordion.Content>
  </Accordion>
);

export default RawJSON;

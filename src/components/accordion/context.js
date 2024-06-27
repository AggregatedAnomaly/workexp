import { createContext, useContext } from "react";

export const AccordionContext = createContext({
  accordionID: "",
  buttonID: "",
  contentID: "",
  isOpen: false,
  isControllable: false,
  isInteractable: false,
  linkButton: () => {
    /* Purposely empty */
  },
  linkContent: () => {
    /* Purposely empty */
  },
  toggle: () => {
    /* Purposely empty */
  },
  open: () => {
    /* Purposely empty */
  },
  close: () => {
    /* Purposely empty */
  },
});
export const AccordionGroupContext = createContext({
  close: () => {
    /* Purposely empty */
  },
  groupId: "",
  isInteractable: false,
  isOpen: () => false,
  maxOpenAccordions: 0,
  query: () => [],
  open: () => {
    /* Purposely empty */
  },
  openAccordions: [],
  registerAccordion: () => {
    /* Purposely empty */
  },
  toggle: () => {
    /* Purposely empty */
  },
  unRegisterAccordion: () => {
    /* Purposely empty */
  },
});

export const useAccordion = (name) => {
  const context = useContext(AccordionContext);
  if (!context.accordionID)
    throw new Error(`<${name}> is missing a parent <Accordion> component`);
  return context;
};
export const useAccordionGroup = (name, optional = false) => {
  const context = useContext(AccordionGroupContext);
  if (!optional && !context.groupId)
    throw new Error(
      `<${name}> is missing required <Accordion.Group> component`
    );
  return context;
};

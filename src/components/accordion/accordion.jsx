"use client";

import React, {
  forwardRef,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  AccordionContext,
  AccordionGroupContext,
  useAccordion,
  useAccordionGroup,
} from "./context";
import {
  AccordionActionsEnum,
  accordionReducer,
  defaultAccordionState,
} from "./reducer";
import Button from "../button";
import Card from "../card";
import { ChevronDown } from "../icons";
import {
  useArray,
  useId,
  useMap,
  useQueue,
  useStableCallback,
  useSyncRefs,
} from "@/hooks";
import { cn } from "@/utils/styling";

const AccordionGroup = ({
  children,
  id,
  isInteractable = true,
  maxOpenable = 1,
}) => {
  const [maxOpen, setMaxOpen] = useState(maxOpenable);
  const accordionRegistry = useArray();
  const referenceMap = useMap();
  const openAccordions = useQueue([], maxOpen);
  const internalId = useId(id);

  const registerAccordion = useStableCallback((id, ref) => {
    if (accordionRegistry.exists(id)) {
      console.warn(`${id} is already registered within this <Accordion.Group>`);
      return;
    }

    accordionRegistry.push(id);
    referenceMap.set(id, ref);
  });

  const unRegisterAccordion = useStableCallback((id) => {
    if (!accordionRegistry.exists(id)) {
      console.warn(`${id} is not registered within this <Accordion.Group>!`);
      return;
    }

    if (openAccordions.exists(id)) openAccordions.remove(id);
    accordionRegistry.remove(id);
    referenceMap.remove(id);
  });

  const openAccordion = useStableCallback((id) => {
    if (!accordionRegistry.exists(id)) {
      console.warn(`${id} is not registered within this <Accordion.Group>`);
      return;
    }

    if (openAccordions.exists(id)) return;
    openAccordions.enqueue(id);
  });

  const closeAccordion = useStableCallback((id) => {
    if (!accordionRegistry.exists(id)) {
      console.warn(`${id} is not registered within this <Accordion.Group>`);
      return;
    }

    if (!openAccordions.exists(id)) return;
    openAccordions.remove(id);
  });

  const toggleAccordion = useStableCallback((id) => {
    if (!accordionRegistry.exists(id)) {
      console.warn(`${id} is not registered within this <Accordion.Group>`);
      return;
    }

    if (openAccordions.exists(id)) openAccordions.remove(id);
    else openAccordions.enqueue(id);
  });

  const isOpen = useStableCallback(
    (id) => accordionRegistry.exists(id) && openAccordions.exists(id)
  );

  const query = useStableCallback((fn) =>
    referenceMap
      .filter(([, ref], id) => !!ref.current && fn(ref.current, id))
      .map((pair) => pair[1].current)
      .filter((element) => hasValue(element))
  );

  return (
    <AccordionGroupContext.Provider
      value={{
        close: closeAccordion,
        groupId: internalId,
        isInteractable,
        isOpen,
        query,
        maxOpenAccordions: maxOpen,
        open: openAccordion,
        openAccordions: openAccordions.queue,
        registerAccordion,
        toggle: toggleAccordion,
        unRegisterAccordion,
      }}
    >
      {typeof children === "function"
        ? children({
            accordionCount: accordionRegistry.length,
            close: closeAccordion,
            isInteractable,
            maxOpenable: maxOpen,
            query,
            open: openAccordion,
            setMaxOpenable: setMaxOpen,
            toggle: toggleAccordion,
          })
        : children}
    </AccordionGroupContext.Provider>
  );
};

const AccordionBase = forwardRef(function AccordionBase(
  { className, children, id, ignoreGroupings = false, open, ...props },
  ref
) {
  const internalRef = useRef(null);
  const innerRef = useSyncRefs(internalRef, ref);
  const internalId = useId(id);

  const accordionGroup = useAccordionGroup("Accordion", true);
  const [state, dispatch] = useReducer(accordionReducer, defaultAccordionState);

  const isControlledByGroup = !!accordionGroup.groupId;
  const isControlledByProps = open !== undefined;
  const isControllable = !isControlledByGroup && !isControlledByProps;
  const isInteractable = true; //TODO - use correct value

  if (isControlledByGroup && isControlledByProps)
    throw new Error(
      "Accordions cannot be managed by a group and by props simultaneously!"
    );

  useEffect(() => {
    if (!isControlledByGroup) return;

    accordionGroup.registerAccordion(internalId, internalRef);
    return () => {
      accordionGroup.unRegisterAccordion(internalId);
    };
  }, []);

  useEffect(() => {
    if (!isControlledByGroup || !accordionGroup.groupId) return;
    const shouldOpen = accordionGroup.isOpen(internalId);

    if (shouldOpen && !state.open)
      dispatch({ type: AccordionActionsEnum.Open });
    else if (!shouldOpen && state.open)
      dispatch({ type: AccordionActionsEnum.Close });
  }, [accordionGroup]);

  useEffect(() => {
    if (isControlledByGroup) return;

    if (open && !state.open) dispatch({ type: AccordionActionsEnum.Open });
    else if (!open && state.open)
      dispatch({ type: AccordionActionsEnum.Close });
  }, [open]);

  const linkButton = useStableCallback((buttonId) => {
    dispatch({ type: AccordionActionsEnum.SetLinkedButton, buttonId });
  });
  const linkContent = useStableCallback((contentId) => {
    dispatch({ type: AccordionActionsEnum.SetLinkedContent, contentId });
  });

  const openAccordion = useStableCallback(() => {
    if (isControlledByProps) {
      console.warn("Cannot open accordion when it is controlled by props!");
      return;
    }

    if (isControlledByGroup) {
      accordionGroup.open(internalId);
      return;
    }

    dispatch({ type: AccordionActionsEnum.Open });
  });
  const closeAccordion = useStableCallback(() => {
    if (isControlledByProps) {
      console.warn("Cannot close accordion when it is controlled by props!");
      return;
    }

    if (isControlledByGroup) {
      accordionGroup.close(internalId);
      return;
    }

    dispatch({ type: AccordionActionsEnum.Close });
  });
  const toggleAccordion = useStableCallback(() => {
    if (isControlledByProps) {
      console.warn("Cannot toggle accordion when it is controlled by props!");
      return;
    }

    if (isControlledByGroup) {
      accordionGroup.toggle(internalId);
      return;
    }

    dispatch({ type: AccordionActionsEnum.Toggle });
  });

  return (
    <AccordionContext.Provider
      value={{
        accordionID: internalId,
        buttonID: state.buttonId ?? "",
        contentID: state.contentId ?? "",
        close: closeAccordion,
        isControllable,
        isInteractable,
        isOpen: state.open,
        linkButton,
        linkContent,
        open: openAccordion,
        toggle: toggleAccordion,
      }}
    >
      <Card
        {...props}
        ref={innerRef}
        id={internalId}
        className={cn(
          "",
          typeof className === "function"
            ? className({ isInteractable, isOpen: state.open })
            : className
        )}
      >
        {typeof children === "function"
          ? children({
              close: closeAccordion,
              isInteractable,
              isOpen: state.open,
              open: openAccordion,
              toggle: toggleAccordion,
            })
          : children}
      </Card>
    </AccordionContext.Provider>
  );
});

const AccordionHeader = forwardRef(function AccordionHeader(
  { children, className, id, ...props },
  ref
) {
  const internalRef = useRef(null);
  const innerRef = useSyncRefs(internalRef, ref);
  const internalId = useId(id);

  const { contentID, isInteractable, isOpen, linkButton, toggle } =
    useAccordion("Accordion.Header");

  const onClick = useStableCallback((evt) => {
    evt.preventDefault();
    if (isInteractable) toggle();
  });

  useEffect(() => {
    linkButton(internalId);
    return () => {
      linkButton(null);
    };
  }, []);

  return (
    <Card.Header
      {...props}
      ref={innerRef}
      id={internalId}
      className={cn(
        "rounded-md hover:bg-teal-500/50 active:bg-teal-300/75",
        {
          "border-b": isOpen,
          "cursor-pointer": isInteractable,
        },
        className
      )}
      onClick={onClick}
    >
      <Button
        type="headless"
        disabled={!isInteractable}
        className="w-full text-left font-semibold text-lg my-auto flex justify-between items-center"
        aria-controls={contentID}
        aria-expanded={isOpen}
      >
        <div className="w-full">{children}</div>
        <ChevronDown
          className={cn("size-5 transition-all duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </Button>
    </Card.Header>
  );
});

const AccordionContent = forwardRef(function AccordionContent(
  { children, className, id, ...props },
  ref
) {
  const internalRef = useRef(null);
  const innerRef = useSyncRefs(internalRef, ref);
  const internalId = useId(id);

  const { buttonID, isOpen, linkContent } = useAccordion("Accordion.Content");

  useEffect(() => {
    linkContent(internalId);
    return () => {
      linkContent(null);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="open"
          exit="hidden"
          variants={{
            open: { opacity: 1, height: "auto" },
            hidden: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <Card.Content
            {...props}
            ref={innerRef}
            id={internalId}
            className={cn("", className)}
            role="region"
            aria-labelledby={buttonID}
          >
            {children}
          </Card.Content>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export const Accordion = Object.assign(AccordionBase, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Group: AccordionGroup,
});

export default Accordion;

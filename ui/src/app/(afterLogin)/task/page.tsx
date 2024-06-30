"use client";

import { Button, Dialog, Divider, Stack } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { ExpendMoreIcons } from "@/components/icons";
import { ButtonSmall, CreateTaskForm } from "@/components/common";
import {
  ButtonType,
  SmallButtonColor,
} from "@/components/common/buttons/AllButtonProps";
import styles from "./TaskPage.module.css";

const TaskPage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Stack className={styles["task-page"]}>
        <Stack className={styles["task-page__container"]}>
          <Stack className={styles["task-page__header"]}>
            <Typography className={styles["task-page__title"]}>
              All Tasks
            </Typography>
            <ButtonSmall
              label="ok"
              colorVarient={SmallButtonColor.MildGreen}
              types={ButtonType.Button}
            />
          </Stack>
          <Divider />
          <Stack>
            <Accordion
              expanded={expanded === "panel"}
              onChange={handleChange("panel")}
            >
              <AccordionSummary
                expandIcon={<ExpendMoreIcons />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Stack className={styles["task-page__accordion-summary"]}>
                  <Typography>Task 1</Typography>
                  <Typography>status</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack className={styles["task-page__accordion-details"]}>
                  <Stack className={styles["task-page__details-content"]}>
                    <Typography
                      className={
                        styles["task-page__details-content__description"]
                      }
                    >
                      task description
                    </Typography>
                    <Typography
                      className={styles["task-page__details-content__date"]}
                    >
                      create date
                    </Typography>
                  </Stack>
                  <Stack className={styles["task-page__actions"]}>
                    <ButtonSmall label="ok" types={ButtonType.Button} />
                    <ButtonSmall
                      label="ok"
                      colorVarient={SmallButtonColor.MildGreen}
                      types={ButtonType.Button}
                    />
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </Stack>
      <Dialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <CreateTaskForm />
      </Dialog>
    </>
  );
};

export default TaskPage;

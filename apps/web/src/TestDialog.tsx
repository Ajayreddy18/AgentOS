import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";

export default function TestDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.5)",
            }}
          />

          <Dialog.Popup
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: 20,
              zIndex: 1000,
            }}
          >
            <Dialog.Title>Test</Dialog.Title>

            <input placeholder="Type here" />

            <button onClick={() => console.log("CLICK")}>Save</button>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

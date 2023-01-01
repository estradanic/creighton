import { JSX } from "solid-js";

export type DialogProps = {
  isOpen: boolean
  onClose: (e?: Event) => void
  closeButtonText?: string
  children: JSX.Element
};

type DialogCloseButtonProps = Pick<DialogProps, "onClose" | "closeButtonText">;

function DialogCloseButton (props: DialogCloseButtonProps): JSX.Element {
  return (
    <div class="flex-full-width">
      <button onClick={() => props.onClose()}>{props.closeButtonText ?? "Close"}</button>
    </div>
  );
}

function Dialog (props: DialogProps): JSX.Element {
  return (
    <>
      {props.isOpen && (
        <div class="dialog" onClick={props.onClose}>
          <div class="dialog-content" onClick={(e) => e.stopPropagation()}>
            <DialogCloseButton {...props} />
            {props.children}
            <DialogCloseButton {...props} />
          </div>
        </div>
      )}
    </>
  );
}

export default Dialog;

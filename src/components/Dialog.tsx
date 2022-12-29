import { JSX } from 'solid-js';

export type DialogProps = {
  isOpen: boolean
  onClose: (e?: Event) => void
  closeButtonText?: string
  children: JSX.Element
}

function Dialog (props: DialogProps): JSX.Element {
  return (
    <div>
      {props.isOpen && (
        <div class="dialog" onClick={props.onClose}>
          <div class="dialog-content" onClick={(e) => e.stopPropagation()}>
            {props.children}
            <div class="flex-full-width">
              <button onClick={props.onClose}>{props.closeButtonText ?? "Close"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;

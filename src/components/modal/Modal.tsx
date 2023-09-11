import React, { useRef, FC} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IModalProps } from "../../utils/types";

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        {/* Your backdrop and transition code here... */}
        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={React.Fragment} /* your transition props here */>
              <Dialog.Panel className="relative transform rounded-lg overflow-auto bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

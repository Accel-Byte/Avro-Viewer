import { XMarkIcon } from "@heroicons/react/20/solid";
import { syntaxHighlight } from "../utilities/syntax-highlight";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  schema: string;
  isDark: boolean;
}

export default function Modal({ isOpen, onClose, schema, isDark }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-lg shadow-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Schema Details</h2>
          <button
            className={`text-gray-500 hover:text-gray-700 ${
              isDark ? "text-gray-300" : "text-gray-500"
            }`}
            onClick={onClose}
          >
            <XMarkIcon width={16} height={16} />
          </button>
        </div>
        <pre
          className={`rounded p-4 text-sm overflow-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 ${
            isDark ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-800"
          }`}
          dangerouslySetInnerHTML={{
            __html: syntaxHighlight(
              JSON.stringify(JSON.parse(schema), undefined, 4)
            ),
          }}
        />
        <div className="mt-4 flex justify-end">
          <button
            className={`${
              isDark
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white px-4 py-2 rounded`}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

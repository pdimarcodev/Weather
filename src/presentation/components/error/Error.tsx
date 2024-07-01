/**
 * Types
 */
interface Props {
  errors: Array<string>;
  retry: () => void;
}

/**
 * Error Component
 */
export const Error = ({ errors, retry }: Props) => (
  <div className="flex flex-col justify-center items-center">
    {errors.map(
      (error) =>
        error && <span className="text-2xl text-black font-bold">{error}</span>
    )}
    <button
      className="mt-8 text-3xl text-black border border-black rounded-full px-4 py-2 hover:bg-gray-300 active:border-gray-300 duration-300 active:text-gray-300"
      onClick={retry}
    >
      Retry
    </button>
  </div>
);

import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 p-2 font-bold text-lg text-center text-white rounded-md">
      {children}
    </p>
  );
}

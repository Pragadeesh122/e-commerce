"use client";

import {cn} from "../lib/utils";
import {Button} from "./ui/button";

export default function SubmitButton({
  pendingLabel,
  label,
  pending,
  className,
}: {
  pendingLabel: string;
  label: string;
  pending: boolean;
  className?: string;
}) {
  return (
    <Button
      type='submit'
      className={cn("px-6 py-2 rounded-full", className)}
      disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

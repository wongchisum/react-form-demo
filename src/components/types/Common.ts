import type { SyntheticEvent } from "react";

export type ObjType = Record<string, unknown>;

export type FieldWrapProps = {
    value: unknown,
    onChange: (event: SyntheticEvent<HTMLInputElement>) => void
}
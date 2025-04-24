"use client";

import React, { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  session: Session | null;
  children: ReactNode; // ✅ Explicitly define children
}

const Provider: React.FC<Props> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

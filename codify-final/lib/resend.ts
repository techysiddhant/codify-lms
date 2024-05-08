import { Resend } from "resend";
import Env from "./env";
export const resend = new Resend(Env.RESEND_API_KEY);

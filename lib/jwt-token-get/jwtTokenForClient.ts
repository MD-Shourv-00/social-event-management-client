import { authClient } from "../auth-client";

export async function jwtTokenForClient() {

    const { data } = await authClient.token();

    return data?.token;
}
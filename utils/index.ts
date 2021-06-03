import Docker from "dockerode";

export const dockerServer = new Docker({ socketPath: "/var/run/docker.sock" });
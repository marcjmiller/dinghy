# Dinghy

### Tech Used:
- [Tailwind CSS v3](https://tailwindcss.com/)
- [NextJs](https://nextjs.org/)
- [Typescript](https://typescriptlang.org)
- [Dockerode](https://github.com/apocas/dockerode)

### Deploy

```bash
docker run --name dinghy -u $(id -u ${USER}):$(cut -d: -f3 < <(getent group docker)) -p 9002:3000 -v /var/run/docker.sock:/var/run/docker.sock --restart unless-stopped -d marcjmiller/dinghy:latest
```
> This runs Dinghy with your current user ID and the docker group ID, so that Dinghy can access `/var/run/docker.sock` to talk to Docker, alternatively you can manually set the -u option

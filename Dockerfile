FROM oven/bun:1

WORKDIR /usr/src/adab

COPY package.json .
COPY bun.lockb .

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "run", "initialise:global"]
